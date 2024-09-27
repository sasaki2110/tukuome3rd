import { atom } from "recoil";
 
export const useridState = atom({  
	key: 'userid', 
	default: '',
});

export const searchModeState = atom({  
	key: 'searchMode', 
	default: '',
});

export const searchValueState = atom({  
	key: 'searchValue', 
	default: '',
});