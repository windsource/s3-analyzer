import { connect } from 'react-redux';
import BucketTable from '../components/BucketTable';
import { retrieveRegion, retrieveSize } from '../actions';

const mapStateToProps = (state) => ({ list: state.list });

const mapDispatchToProps = (dispatch) => (
  {
    loadRegion: (bucketName) => { dispatch(retrieveRegion(bucketName)); },
    loadSize: (bucketName, region) => { dispatch(retrieveSize(bucketName, region)); },
  }
);

const DynBucketTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(BucketTable);

export default DynBucketTable;
