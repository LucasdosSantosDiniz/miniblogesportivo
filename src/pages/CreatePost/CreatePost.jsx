import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreatePost.module.css";
import { useInsertDocument } from "../../hooks/useInsertDocument";
import { useAuthValue } from "../../context/AuthContext";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState([]);
  const [formError, setFormError] = useState("");

  const { response, insertDocument } = useInsertDocument("posts");
  const { user } = useAuthValue();
  const navigate = useNavigate();

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

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });
    navigate("/");
  };
  return (
    <div className={styles.create_post}>
      <h1>Criar Post</h1>
      <p> Escreva sobre o que quiser e compartilhe o seu conhecimento .</p>
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
    </div>
  );
};

export default CreatePost;
