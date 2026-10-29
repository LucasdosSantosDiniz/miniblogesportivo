import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EditPost.module.css";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchSingleDocument } from "../../hooks/useFetchSingleDocument";

const EditPost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState([]);
  const [formError, setFormError] = useState("");

  const { id } = useParams();
  const { documentSingle: post } = useFetchSingleDocument("posts", id);
  const { response, updateDocument } = useUpdateDocument("posts");
  const { user } = useAuthValue();
  const navigate = useNavigate();
  console.log(post);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);

      const textTags = post.tagsArray.join(", ");
      setTag(textTags);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    // Validar URL da imagem
    try {
      new URL(image);
    } catch (error) {
      console.log(error);
      setFormError("A imagem não foi carregada");
      return;
    }

    // criar tags array
    const tagsArray = tag.split(",").map((tag) => tag.trim().toLowerCase());

    // chcar todos os valores
    if (!title || !image || !tag || !body) {
      setFormError(" Preencha todos os campos !");
    }

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    };

    updateDocument(id, data);
    navigate("/dashboard");
  };
  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h1>Editar post "{post.title}"</h1>
          <p> Altere o seu post como desejar .</p>
          <form onSubmit={handleSubmit}>
            <label>
              <span> Titulo:</span>
              <input
                type="text"
                name="title"
                required
                placeholder="Titulo do Texto"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>
            <label>
              <span> URL:</span>
              <input
                type="text"
                name="image"
                required
                placeholder="Insira uam imagem para seu blog"
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </label>
            <p className={styles.preview_title}>Preview da imagem atual</p>
            <img
              className={styles.image_preview}
              src={post.image}
              alt={post.title}
            />
            <label>
              <span> Escreva o que esta pensando</span>
              <textarea
                name="body"
                required
                placeholder="Digite seu texto"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              ></textarea>
            </label>
            <label>
              <span> Tags:</span>
              <input
                type="text"
                name="tags"
                required
                placeholder="Insira tags separadas por virgulas"
                onChange={(e) => setTag(e.target.value)}
                value={tag}
              />
            </label>

            {!response.loading && <button className="btn">Enviar</button>}
            {response.loading && (
              <button className="btn" disabled>
                Aguarde...
              </button>
            )}
            {(response.error || response.authError) && (
              <p className="error">{response.error || response.authError}</p>
            )}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
