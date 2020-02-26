const INITIAL_STATE = {
    action1 : 1,
    action2 : 1,
    action3 : 1,
    list : {
        "1":{id: 1,name: "Hello" ,archive: false},
        "2":{id: 2,name: "Abc" ,archive: false},
        "3":{id: 3,name: "456" ,archive: false},
        "4":{id: 4,name: "123" ,archive: false}
    }
};

const custom = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'ACTION_1':
            return {
                ...state,
                action1 : state.action1 + 1
            };
        case 'ACTION_2':
            return {
                ...state,
                action2 : state.action2 + 1
            };
        case 'ACTION_3':
            return {
                ...state,
                action3 : state.action3 + 1
            };
        case 'ACTION_REQUESTED':
            return {
                ...state,
                loading : true
            };
        case 'ACTION_SUCCEED':
            return {
                ...state,
                loading : false
            };
        case 'UNDO':
            return {
                ...state
            };
        case 'UNDO_UI_SHOW':
            return {
                ...state,
                actionUndo: true,
                undoId: action.undoId
            };
        case 'UNDO_UI_HIDE':
            return {
                ...state,
                actionUndo: false,
                undoId:''
            };
        case 'UPDATE_ARCHIVE':
            return {
                ...state,
                list : {
                    ...state.list,
                    [action.id]:{
                        ...state.list[action.id],
                        archive: action.archive
                    }
                }
            };     
        default:
            return state;
    }
};

export default custom;