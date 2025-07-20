import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Typography, Space } from 'antd';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../store/store';
import { 
  moveShapesLeft,
  moveShapesRight,   
  toggleGridPosition, 
  randomizeShapePosition 
} from '../../store/shapeSlice';
import './ShapeManagement.scss';

const { Title, Text } = Typography;

const ShapeManagement: React.FC = () => {
  const dispatch = useDispatch();
  const { shapes, gridPosition } = useSelector((state: RootState) => state.shapes);
  const { t } = useTranslation();

  const handleMoveLeft = () => {
    console.log('Moving shapes left'); // Debug log
    dispatch(moveShapesLeft());
  };

  const handleMoveRight = () => {
    console.log('Moving shapes right'); // Debug log
    dispatch(moveShapesRight());
  };

  const handleTogglePosition = () => {
    console.log('Toggling grid position from:', gridPosition); // Debug log
    dispatch(toggleGridPosition());
  };

  const handleShapeClick = (shapeId: string) => {
    console.log('Shape clicked:', shapeId); // Debug log
    dispatch(randomizeShapePosition(shapeId));
  };

  const renderShape = (shape: any) => {
    const shapeClass = `shape ${shape.type}`;
    return (
      <div
        key={shape.id}
        className={shapeClass}
        onClick={() => handleShapeClick(shape.id)}
        title={t(`shapes.${shape.type}`, { defaultValue: shape.type })}
        style={{ cursor: 'pointer' }}
      />
    );
  };

  const sortedShapes = [...shapes].sort((a, b) => a.position - b.position).slice(0, 6);

  return (
    <div className="shape-management">
      <Card>
        <Title level={2}>{t('shapes.title', { defaultValue: 'Shape Management' })}</Title>
        
        <div className="control-buttons">
          <Button
            type="primary"
            size="large"
            onClick={handleMoveLeft}
            className="move-left-btn"
          >
            ← {t('shapes.moveLeft', { defaultValue: 'Move Left' })}
          </Button>
          
          <Button
            type="primary"
            size="large"
            onClick={handleTogglePosition}
            className="toggle-position-btn"
          >
            ↕ {t('shapes.togglePosition', { defaultValue: 'Toggle Position' })}
          </Button>

          <Button
            type="primary"
            size="large"
            onClick={handleMoveRight}
            className="move-right-btn"
          >
            {t('shapes.moveRight', { defaultValue: 'Move Right' })} →
          </Button>
        </div>   
      </Card>
      <div className={`shape-container ${gridPosition === 'top' ? 'grid-top' : 'grid-bottom'}`}>
            {sortedShapes.map(renderShape)}
          </div>
    </div>
  );
};

export default ShapeManagement;