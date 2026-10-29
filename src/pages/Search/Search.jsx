import styles from "./Search.module.css";
import notFoundPlayer from "../../assets/not-found-player.png";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";
import { Link } from "react-router-dom";
import PostDetail from "../../components/PostDetail/PostDetail";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");
  const { documents: posts } = useFetchDocuments("posts", search);
  return (
    <div className={styles.search}>
      <h1>Search</h1>
      <div className={styles.noposts}>
        {posts && posts.length === 0 && (
          <>
            <p> Não foi encontrado posts a partir dessa busca</p>
            <img
              src={notFoundPlayer}
              alt="Jogador de futebol triste"
              className={styles.notFoundImg}
            />
            <Link to="/" className="btn btn-search">
              Voltar
            </Link>
          </>
        )}
        {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Search;
