import { Grid } from "semantic-ui-react";
import { useRepository } from "../../repository/Repository";
import { observer } from "mobx-react-lite";
import ActivenessItem from "./ActivenessItem";
import { useEffect } from "react";
import LoadingComponent from "../loading/LoadingComponent";
import ActivityFilters from "./ActivenessFilters";

export default observer(function ActivenessItems() {
  const { repo } = useRepository();
  const {
    activities
  } = repo;
  useEffect(() => { repo.loadActivities(); }, [repo]);

  if (repo.loadingInit) {
    return <LoadingComponent text='Please wait...' />;
  }

  return (
    <div>
      <Grid style={{ color: 'white' }}>
        <Grid.Column width='10'>
          {activities.map(e => <ActivenessItem activenessItem={e} key={e.id} />)}
        </Grid.Column>
        <Grid.Column width='6'>
          <ActivityFilters />
        </Grid.Column>
      </Grid>
    </div >
  );
})