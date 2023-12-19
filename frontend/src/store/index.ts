import { create } from "zustand";

interface StoreProps {
  action: string;
  setAction: (action: string) => void;
}

//zustand로 상태관리를 하는 이유 :
// 새로고침시 header에 저장해둔 accesstoken이 사라지기때문에
// token으로 get요청을 보낼때, 에러401이 반환되면 refreshtoken을 확인후
// 새로운 accesstoken을 발급받아 header에 저장함.
// accesstoken을 발급받는 api는 저장x.
// accesstoken이 필요했던 마지막요청을 다시 보내기위해
// 마지막요청을 저장해둠.
// 해당 과정에서 문제가 발생.
// 달력모드와 달력+todo모드라고 부르겠음.
// 달력모드에서 새로고침후 날짜를 클릭해 달력+todo모드로 전환시
// 해당유저에대한 todo리스트를 가져오는 api를 호출함.
// 하지만 해당 api는 accesstoken이 필요한 api이기때문에
// token url로 get요청을 하게되고 에러 401이 반환되므로 마지막요청이 token url get요청이됨.
// token url get요청후 원래의 todo리스트를 가져오는 api를 호출해야함.
// 그래서 token 요청후에는 useStore의 action을 체크한후 해당 action에 맞는 api를 호출.
// 새로고침시 zustand또한 날라가기때문에 실패
//

const useStore = create<StoreProps>((set) => ({
  action: "",
  setAction: (action) => set({ action: action }),
}));

export default useStore;
