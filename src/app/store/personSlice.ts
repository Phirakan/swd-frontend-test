import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Person {
  id: string;
  name: string;
  age: number;
  email: string;
  phone: string;
  address: string;
  nationality?: string;
  citizenId: string;
  gender: 'Male' | 'Female' | 'Unisex';
  mobilePhone: string;
}

interface PersonState {
  persons: Person[];
  loading: boolean;
}

const loadPersonsFromStorage = (): Person[] => {
  try {
    const stored = localStorage.getItem('persons');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

const savePersonsToStorage = (persons: Person[]) => {
  localStorage.setItem('persons', JSON.stringify(persons));
};

const initialState: PersonState = {
  persons: loadPersonsFromStorage(),
  loading: false,
};

const personSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    addPerson: (state, action: PayloadAction<Omit<Person, 'id'>>) => {
      const newPerson: Person = {
        ...action.payload,
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      };
      state.persons.push(newPerson);
      savePersonsToStorage(state.persons);
    },

    updatePerson: (state, action: PayloadAction<Person>) => {
      const index = state.persons.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.persons[index] = action.payload;
        savePersonsToStorage(state.persons);
      }
    },

    deletePerson: (state, action: PayloadAction<string>) => {
      state.persons = state.persons.filter(p => p.id !== action.payload);
      savePersonsToStorage(state.persons);
    },
    
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { addPerson, updatePerson, deletePerson, setLoading } = personSlice.actions;
export default personSlice.reducer;