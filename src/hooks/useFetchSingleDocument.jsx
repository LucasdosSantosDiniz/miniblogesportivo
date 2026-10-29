import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";

export const useFetchSingleDocument = (docCollection, id) => {
  const [documentSingle, setDocumentSingle] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  //deal with momory leak
  const [cancelled, setCancelled] = useState(false);

  useEffect(() => {
    async function loadDocument() {
      if (cancelled) {
        return;
      }
      setLoading(true);

      try {
        const docRef = await doc(db, docCollection, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setDocumentSingle({
            id: docSnap.id,
            ...docSnap.data(),
          });
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message);
        setLoading(false);
      }
    }
    loadDocument();
  }, [docCollection, id, cancelled]);

  useEffect(() => {
    return () => setCancelled(true);
  }, []);

  return { documentSingle, loading, error };
};
