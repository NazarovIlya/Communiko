import { Grid } from "semantic-ui-react";
import { useRepository } from "../../repository/Repository";
import { observer } from "mobx-react-lite";
import LoadingComponent from "../loading/LoadingComponent";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ActivenessDetailsChat from "./ActivenessDetailsChat";
import ActivenessDetailsHeader from "./ActivenessDetailsHeader";
import ActivenessDetailsInfo from "./ActivenessDetailsInfo";
import ActivenessDetailsSidebar from "./ActivenessDetailsSidebar";


export default observer(function ActivenessDetails() {
  const { repo } = useRepository();
  const {
    loadActiveness,
    selectedActiveness,
    loadingInit
  } = repo;
  const { id } = useParams();
  useEffect(() => {
    if (id) loadActiveness(id);
  }, [id, loadActiveness]);
  const item = selectedActiveness!;

  if (loadingInit || !item) return <LoadingComponent />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivenessDetailsHeader item={item} />
        <ActivenessDetailsInfo item={item} />
        <ActivenessDetailsChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivenessDetailsSidebar participants={selectedActiveness.users} />
      </Grid.Column>
    </Grid>
  );
})