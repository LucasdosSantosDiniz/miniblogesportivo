import styles from "./Home.module.css";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
//Hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
//components
import PostDetail from "../../components/PostDetail/PostDetail";

const Home = () => {
  const [query, setQuery] = useState("");
  const { documents: posts, loading } = useFetchDocuments("posts");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className={styles.home}>
      <h1>Posts Recentes</h1>
      <form className={styles.search_form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ou busque por tags"
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-search">Pesquisar</button>
      </form>
      <div>
        <h1>Opiniões de futebol é aqui</h1>
        {loading && <p> Carregando...</p>}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p> Não foi nada encontrado .</p>{" "}
            <Link to="/posts/create" className="btn">
              Criar primeiro post
            </Link>{" "}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
