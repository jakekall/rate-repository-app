import RepositoryInfo from "./RepositoryInfo";
import useRepository from "../../hooks/useRepository";
import { useParams } from "react-router-native";

const SingleRepository = () => {
  let { repositoryId } = useParams();
  const { repository } = useRepository(repositoryId);

  return repository && <RepositoryInfo repository={repository} hasGithubButton={true} />;
};

export default SingleRepository;