import { call, put, takeEvery, takeLatest ,select,take,all,race,throttle,fork,spawn,delay} from 'redux-saga/effects'


// const delay = (sec) => new Promise((res,rej)=>{
//   setTimeout(res,sec);
// });



function* fetchUser(username,password) {
  try {
      
    //  const token = yield call(loginUser, username, password);
    //  let state = yield select();
    // const results = yield all([call(loginUser, username, password), call(getEstimatesDetails)])
    // yield put(showResults(results))
    const results = yield race({
      login : call(loginUser, username, password),
      estimates : call(getEstimatesDetails)
    })

    yield console.log('Results::',results);
     yield put({type: "USER_FETCH_SUCCEED", session: token});
      state = yield select();
      return token;
     
  } catch (e) {
     yield put({type: "USER_FETCH_FAILED", message: e.message});
  }
}

/*
 Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
 Allows concurrent fetches of user.
*/
// function* mySaga() {
//  yield takeEvery("CLICK_EVENT", fetchUser);
// }

/*
 Alternatively you may use takeLatest.

 Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
 dispatched while a fetch is already pending, that pending fetch is cancelled
 and only the latest one will be run.
*/
function* mySaga() {
//  yield takeLatest("CLICK_EVENT", fetchUser);/
//  yield takeEvery('*', function* logger(action) {
//   const state = yield select()

//   console.log('action', action)
//   console.log('state after', state)
// })
// while (true) {
//   const action = yield take('*')
//   const state = yield select()

//   console.log('from watchAndLog action', action)
//   console.log('from watchAndLog state after', state)
// }
  while(true){
    const action = yield take('ARCHIVE');
    yield fork(handleArchive , action);
  }
yield throttle(5000, 'INPUT_CHANGING', handleInputChanging)
yield takeLatest('INPUT_CHANGED', handleInput);
// function* loginFlow() {
  while (true) {
    const {user ,password} = yield take('LOGIN_REQUESTED')
    
    const token = yield call(fetchUser,user,password);
    yield console.log("Token set in local memory::",token);
    yield take('LOGOUT_REQUESTED')
    yield console.log('Login successfully..')
    
  }
  
}

function* handleArchive(action){
  const undoId = `UNDO_${action.archiveId}`;
  const threadId = action.id;
  yield put({type:'UNDO_UI_SHOW',undoId});

  yield put({type:'UPDATE_ARCHIVE',id: threadId,archive:true});

  // const raceData = yield race({
  //   undo : take(action=>action.type==='UNDO'&&action.id===undoId),
  //   archive : delay(5000)
  // })

  const { undo, archive } = yield race({
    undo: take(action => action.type === 'UNDO' && action.undoId == undoId),
    archive: delay(5000)
  })

  yield put({type:'UNDO_UI_HIDE',id : undoId})

  if(undo){
    yield put({type:'UPDATE_ARCHIVE',id: threadId,archive:false});
  }
  else if (archive){
    yield put({type:'CALLED_API_UPDATE_ARCHIVE'});
    console.log('called api for update archive thread..')
  }
}

function* handleInputChanging(action){
  console.log('input changing',action);
}

function* handleInput({ input }) {
  
  // debounce by 500ms
  yield delay(500)
  yield console.log('Input Changed.',input)
}


function loginUser(user,password){
  return fetch('http://localhost:8080/oauth/token?username='+user+'&password='+password+'&grant_type=password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic '+window.btoa("acc-app:secret")
        }
      })
  .then(data => data.json())
}

function getEstimatesDetails(){
  return fetch('http://localhost:8080/estimates', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 3dd5765b-560d-4449-b860-df30985b3ba8'
        }
      })
  .then(data => data.json())
}

function* helloSaga(){
  let count = 0;
  console.log('hello from Saga')
  yield takeLatest('ACTION_1',action1Handler)
  yield takeLatest('ACTION_2',action1Handler)
  yield takeLatest('ACTION_3',action1Handler)
  while(true){
    if(count<3){
      let act = yield take('CUSTOM_ACTION');
      console.log("ACTION:: ",act)
      count++;
    }
    else{
      console.log('now not able to listen CUSTOM_ACTION action.')
      break;
    }
    
  }
}

function* action1Handler(action){
  yield put({type:'ACTION_REQUESTED'});
  yield call(delay,5000);
  yield put({type:'ACTION_SUCCEED'});
  yield console.log('action1 happened',action)
}

export default function* rootSaga() {
  yield all([
    helloSaga(),
    mySaga()
  ])
}

console.log('changes done...')
console.log("another changes..")

console.log("master first changes")
console.log("master second changes")