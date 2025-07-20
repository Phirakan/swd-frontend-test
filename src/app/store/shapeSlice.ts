import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Shape {
  id: string;
  type: 'circle' | 'square' | 'triangle' | 'diamond' | 'pentagon' | 'trapezoid';
  position: number;
}

interface ShapeState {
  shapes: Shape[];
  gridPosition: 'top' | 'bottom';
  currentRotation: number;
}

const initialShapes: Shape[] = [
  { id: '1', type: 'circle', position: 0 },
  { id: '2', type: 'square', position: 1 },
  { id: '3', type: 'triangle', position: 2 },
  { id: '4', type: 'diamond', position: 3 },
  { id: '5', type: 'pentagon', position: 4 },
  { id: '6', type: 'trapezoid', position: 5 },
];

const initialState: ShapeState = {
  shapes: initialShapes,
  gridPosition: 'bottom',
  currentRotation: 0,
};

const shapeSlice = createSlice({
  name: 'shapes',
  initialState,
  reducers: {
    moveShapesRight: (state) => {

      state.shapes = state.shapes.map(shape => ({
        ...shape,
        position: (shape.position + 1) % 6
      }));
      state.currentRotation = (state.currentRotation + 1) % 6;
    },

    moveShapesLeft: (state) => {

      state.shapes = state.shapes.map(shape => ({
        ...shape,
        position: (shape.position - 1 + 6) % 6
      }));
      state.currentRotation = (state.currentRotation - 1 + 6) % 6;
    },

    toggleGridPosition: (state) => {
      state.gridPosition = state.gridPosition === 'top' ? 'bottom' : 'top';
       state.shapes = state.shapes.map(shape => ({
      ...shape,
      position: shape.position < 3           
        ? shape.position + 3             
        : shape.position - 3                 
      }));
    },

    randomizeShapePosition: (state, action: PayloadAction<string>) => {
      const clickedShape = state.shapes.find(shape => shape.id === action.payload);
      if (clickedShape) {
    
        const currentPosition = clickedShape.position;
        const allPositions = [0, 1, 2, 3, 4, 5];
        const availablePositions = allPositions.filter(pos => pos !== currentPosition);
        
        if (availablePositions.length > 0) {
          
          const newPosition = availablePositions[Math.floor(Math.random() * availablePositions.length)];
          
          const targetShape = state.shapes.find(shape => shape.position === newPosition);
          
          if (targetShape) {

            targetShape.position = currentPosition;
          }
          
          clickedShape.position = newPosition;
        }
      }
    },
  },
});

export const { moveShapesLeft, moveShapesRight, toggleGridPosition, randomizeShapePosition } = shapeSlice.actions;
export default shapeSlice.reducer;