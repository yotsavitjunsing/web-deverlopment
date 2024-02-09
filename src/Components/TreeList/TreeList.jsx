import React from 'react';

class TreeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      trees: [  // ข้อมูลต้นไม้
        { id: 1, name: 'Pine', type: 'Coniferous' },
        { id: 2, name: 'Oak', type: 'Deciduous' },
        { id: 3, name: 'Maple', type: 'Deciduous' },
        // ... เพิ่มต้นไม้เพิ่มเติมตามที่ต้องการ
      ],
    };
  }

  render() {
    return (
      <div>
        <h1>Tree List</h1>
        <ul>
          {this.state.trees.map(tree => (
            <li key={tree.id}>
              <strong>{tree.name}</strong> - {tree.type}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default TreeList;
