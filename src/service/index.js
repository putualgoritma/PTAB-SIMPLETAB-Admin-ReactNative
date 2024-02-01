import Config from 'react-native-config';
import Get from './Get';
import Post from './Post';
import Put from './Put';
import Delete from './Delete';

// GET
const customers = token => Get('/api/close/admin/customers', false, token);
const categories = token => Get('/api/close/admin/categories', false, token);
const categorieslist = (data, token) =>
  Get('/api/close/admin/categories/list/' + data, false, token);
const dapertements = token =>
  Get('/api/close/admin/dapertements', false, token);
const dapertementslist = (data, token) =>
  Get('/api/close/admin/dapertements/list/' + data, false, token);
const dapertementsuser = (data, token) =>
  Get('/api/close/admin/dapertements?userid=' + data, false, token);
const staffs = token => Get('/api/close/admin/staffs', false, token);
const ticktes = token => Get('/api/close/admin/tickets', false, token);
const actionStaffs = (data, token) =>
  Get(`/api/close/admin/actionStaffs/${data}`, false, token);
const actionStaffLists = (data, token) =>
  Get(`/api/close/admin/actionStaffLists/${data}`, false, token);
const defcustomer = token => Get('/api/close/admin/defcustomer', false, token);
const lockStaffList = (data, token) =>
  Get(`/api/close/admin/lockStaffList/${data}`, false, token);
const lockStaffs = (data, token) =>
  Get(`/api/close/admin/lockStaffs/${data}`, false, token);
const lockShow = (data, token) =>
  Get(`/api/close/admin/lockshow/${data}`, false, token);
const typeShow = (data, token) =>
  Get(`/api/close/admin/typeshow/${data}`, false, token);
const lockcreate = (data, token) =>
  Get(`/api/close/admin/lockcreate/${data}`, false, token);

//POST
const staffslist = (data, token) =>
  Post('/api/close/admin/staffs/list', false, data, token);
const subdapertementslist = (data, token) =>
  Post('/api/close/admin/subdapertements/list', false, data, token);
const login = data => Post('/api/open/admin/login', false, data);
const customerCreate = (data, token) =>
  Post('/api/close/admin/customers', false, data, token);
const categoriesCreate = (data, token) =>
  Post('/api/close/admin/categories', false, data, token);
const dapertementsCreate = (data, token) =>
  Post('/api/close/admin/dapertements', false, data, token);
const subdapertementsCreate = (data, token) =>
  Post('/api/close/admin/subdapertements', false, data, token);
const staffsCreate = (data, token) =>
  Post('/api/close/admin/staffs', false, data, token);
const actionsCreate = (data, token) =>
  Post('/api/close/admin/actions', false, data, token);
const actionsStaffStore = (data, token) =>
  Post('/api/close/admin/actionStaffStore', false, data, token);
const customerList = (data, token) =>
  Post(`/api/close/admin/customer/list`, false, data, token);
const ticketList = (data, token) =>
  Post(`/api/close/admin/ticket/list`, false, data, token);
const actions = (data, token) =>
  Post(`/api/close/admin/actionlists`, false, data, token);
const categorygroupList = (data, token) =>
  Post(`/api/close/admin/category-groups/list`, false, data, token);
const categorytypeList = (data, token) =>
  Post(`/api/close/admin/category-types/list`, false, data, token);
const lockList = (data, token) =>
  Post(`/api/close/admin/lock/list`, false, data, token);
const lockStaffStore = (data, token) =>
  Post('/api/close/admin/lockStaffStore', false, data, token);
const actionslock = (data, token) =>
  Post(`/api/close/admin/actionlocklists`, false, data, token);
const lockactionsCreate = (data, token) =>
  Post('/api/close/admin/lockactionscreate', false, data, token);
const segelList = (data, token) =>
  Post(`/api/close/admin/segel/list`, false, data, token);
const lockStore = (data, token) =>
  Post('/api/close/admin/segel/store', false, data, token);
const DaperdanSub = (data, token) =>
  Post('/api/close/admin/SubDapertementlist', false, data, token);
const ticketsClose = (data, token) =>
  Post(`/api/close/admin/ticket-close`, false, data, token);

const actionDetail = (data, token) =>
  Post(`/api/close/admin/actiondetail`, false, data, token);
const ticketDetail = (data, token) =>
  Post(`/api/close/admin/ticket-detail`, false, data, token);
// PUT
const customerEdit = (data, token) =>
  Put(`/api/close/admin/customers/${data.id}`, false, data, token);
const categoriesEdit = (data, token) =>
  Put(`/api/close/admin/categories/${data.id}`, false, data, token);
const dapertementsEdit = (data, token) =>
  Put(`/api/close/admin/dapertements/${data.id}`, false, data, token);
const subdapertementsEdit = (data, token) =>
  Put(`/api/close/admin/subdapertements/${data.id}`, false, data, token);
const staffsEdit = (data, token) =>
  Put(`/api/close/admin/staffs/${data.id}`, false, data, token);
const ticketsEdit = (data, token) =>
  Put(`/api/close/admin/tickets/${data.id}`, false, data, token);
const actionsEdit = (data, token) =>
  Put(`/api/close/admin/actions/${data.id}`, false, data, token);
const actionStaffUpdate = (data, token) =>
  Put(`/api/close/admin/actionStaffUpdate`, false, data, token);

// DELETE
const customerDelete = (id, token) =>
  Delete(`/api/close/admin/customers/${id}`, false, token);
const categoriesDelete = (id, token) =>
  Delete(`/api/close/admin/categories/${id}`, false, token);
const dapertementsDelete = (id, token) =>
  Delete(`/api/close/admin/dapertements/${id}`, false, token);
const subdapertementsDelete = (id, token) =>
  Delete(`/api/close/admin/subdapertements/${id}`, false, token);
const staffsDelete = (id, token) =>
  Delete(`/api/close/admin/staffs/${id}`, false, token);
const ticketsDelete = (id, token) =>
  Delete(`/api/close/admin/tickets/${id}`, false, token);
const actionsDelete = (id, token) =>
  Delete(`/api/close/admin/actions/${id}`, false, token);
const actionStaffDestroy = (data, token) =>
  Delete(
    `/api/close/admin/actionStaffDestroy/${data.action_id}/${data.staff_id}`,
    false,
    token,
  );
const lockDestroy = (id, token) =>
  Delete(`/api/close/admin/lockdestroy/${id}`, false, token);
const lockStaffDestroy = (data, token) =>
  Delete(
    `/api/close/admin/lockStaffDestroy/${data.lockaction_id}/${data.staff_id}`,
    false,
    token,
  );
const lockactionsDelete = (id, token) =>
  Delete(`/api/close/admin/lockactionsdestroy/${id}`, false, token);
const API = {
  login,
  customers,
  customerEdit,
  customerDelete,
  customerCreate,
  categories,
  categoriesCreate,
  categoriesEdit,
  categoriesDelete,
  dapertements,
  dapertementsCreate,
  dapertementsEdit,
  dapertementsDelete,
  subdapertementsDelete,
  staffs,
  staffsCreate,
  staffsEdit,
  staffsDelete,
  ticktes,
  ticketsEdit,
  ticketsDelete,
  actions,
  actionsCreate,
  actionsEdit,
  actionsDelete,
  actionStaffs,
  actionStaffLists,
  actionsStaffStore,
  actionStaffUpdate,
  actionStaffDestroy,
  customerList,
  ticketList,
  categorieslist,
  dapertementslist,
  staffslist,
  subdapertementslist,
  subdapertementsCreate,
  subdapertementsEdit,
  dapertementsuser,
  categorygroupList,
  categorytypeList,
  defcustomer,
  lockList,
  lockStaffList,
  lockStaffs,
  lockStaffStore,
  actionslock,
  lockactionsCreate,
  lockDestroy,
  lockStaffDestroy,
  lockactionsDelete,
  lockShow,
  typeShow,
  segelList,
  lockStore,
  lockcreate,
  DaperdanSub,
  ticketsClose,
  ticketDetail,
  actionDetail,
};

export default API;
