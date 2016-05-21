import { connect } from 'react-redux';
import BucketTable from '../components/BucketTable';

const mapStateToProps = (state) => ({ list: state });

const DynBucketTable = connect(
  mapStateToProps
)(BucketTable);

export default DynBucketTable;
