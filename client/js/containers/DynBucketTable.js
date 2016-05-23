import { connect } from 'react-redux';
import BucketTable from '../components/BucketTable';
import { retrieveRegion } from '../actions';

const mapStateToProps = (state) => ({ list: state.list });

const mapDispatchToProps = (dispatch) => (
  {
    loadRegion: (bucketName) => { dispatch(retrieveRegion(bucketName)); },
  }
);

const DynBucketTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(BucketTable);

export default DynBucketTable;
