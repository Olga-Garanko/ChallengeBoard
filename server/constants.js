const loadStates = [
  'En route to Pick Up',
  'Arrived to Pick Up',
  'En route to delivery',
  'Arrived to delivery'
];

const loadStatuses = ['NEW', 'POSTED', 'ASSIGNED', 'SHIPPED'];
const roles = ['SHIPPER', 'DRIVER'];

const truckStatuses = {
  'OS': 'Out of Service',
  'IS': 'In Service',
  'OL': 'On Load'
};

const truckTypes = [
  {
    'type': 'SPRINTER',
    'dimensions': {
      'width': 300,
      'height': 250,
      'length': 170
    },
    'payload': 1700
  },
  {
    'type': 'SMALL STRAIGHT',
    'dimensions': {
      'width': 500,
      'height': 250,
      'length': 170
    },
    'payload': 2500
  },
  {
    'type': 'LARGE STRAIGHT',
    'dimensions': {
      'width': 700,
      'height': 350,
      'length': 200
    },
    'payload': 4000
  }
];

module.exports = {
  loadStates,
  loadStatuses,
  truckStatuses,
  truckTypes,
  roles
};
