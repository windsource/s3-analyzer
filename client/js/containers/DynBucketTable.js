import { connect } from 'react-redux';
import BucketTable from '../components/BucketTable';
import { retrieveSizeStream } from '../actions';

const mapStateToProps = (state) => ({ list: state.list });

const mapDispatchToProps = (dispatch) => (
  {
    loadSize: (bucketName, region) => { dispatch(retrieveSizeStream(bucketName, region)); },
  }
);

const DynBucketTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(BucketTable);

export default DynBucketTable;
