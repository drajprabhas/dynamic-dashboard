import React, { useState } from 'react';
import './App.css';
import dashboardJsonData from './dashboardData.json'; // Import JSON file

function App() {
  // Initialize the dashboard data with the imported JSON file
  const [dashboardData, setDashboardData] = useState(dashboardJsonData);

  const [newCategory, setNewCategory] = useState('');
  const [newWidget, setNewWidget] = useState({ categoryId: '', name: '', text: '' });

  // Function to add a new category
  const addCategory = () => {
    const newId = Date.now();
    setDashboardData({
      ...dashboardData,
      categories: [...dashboardData.categories, { id: newId, name: newCategory, widgets: [] }]
    });
    setNewCategory('');
  };

  // Function to remove a category
  const removeCategory = (categoryId) => {
    setDashboardData({
      ...dashboardData,
      categories: dashboardData.categories.filter(category => category.id !== categoryId)
    });
  };

  // Function to add a widget to a category
  const addWidget = (categoryId) => {
    const newWidgetId = Date.now();
    const updatedCategories = dashboardData.categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          widgets: [...category.widgets, { id: newWidgetId, name: newWidget.name, text: newWidget.text }]
        };
      }
      return category;
    });
    setDashboardData({ ...dashboardData, categories: updatedCategories });
    setNewWidget({ categoryId: '', name: '', text: '' });
  };

  // Function to remove a widget from a category
  const removeWidget = (categoryId, widgetId) => {
    const updatedCategories = dashboardData.categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          widgets: category.widgets.filter(widget => widget.id !== widgetId)
        };
      }
      return category;
    });
    setDashboardData({ ...dashboardData, categories: updatedCategories });
  };

  // Handle input changes for new widget and category
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewWidget({ ...newWidget, [name]: value });
  };

  return (
    <div className="App">
      <h1>Dynamic Dashboard</h1>

      {/* Display categories and widgets */}
      {dashboardData.categories.map(category => (
        <div key={category.id} className="category">
          <h2>{category.name}</h2>
          <button onClick={() => removeCategory(category.id)}>Remove Category</button>
          <div className="widgets">
            {category.widgets.map(widget => (
              <div key={widget.id} className="widget">
                <h3>{widget.name}</h3>
                <p>{widget.text}</p>
                <button onClick={() => removeWidget(category.id, widget.id)}>Remove Widget</button>
              </div>
            ))}
            <div className="add-widget">
              <h3>+ Add Widget</h3>
              <input
                type="text"
                name="name"
                placeholder="Widget Name"
                value={newWidget.name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="text"
                placeholder="Widget Text"
                value={newWidget.text}
                onChange={handleInputChange}
              />
              <button onClick={() => addWidget(category.id)}>Add Widget</button>
            </div>
          </div>
        </div>
      ))}

      {/* Add new category section */}
      <div className="add-category">
        <h3>+ Add Category</h3>
        <input
          type="text"
          placeholder="Category Name"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={addCategory}>Add Category</button>
      </div>
    </div>
  );
}

export default App;
