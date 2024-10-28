import Farm from '../model/farms';

export const MYFARMS = [
  new Farm(
    'Thạnh Nhật, Gò Công Tây, Tiền Giang', //ví dụ là địa chỉ, quá lười để đổi
    'Green Acres Farm',
    'F001',
    'https://maps.app.goo.gl/B53mDabSCUWAntcp9',
    150.5,
    3,
    [
      { imagesUrl: 'https://cdn.pixabay.com/photo/2021/08/17/21/03/herd-6554180_1280.jpg' },
    ]
  ),
  new Farm(
    'Phú Khương, Tp. Bến Tre, Bến Tre',
    'Sunny Fields',
    'F002',
    'https://example.com/map/sunny-fields',
    120.7,
    2,
    [
        { imagesUrl: 'https://cdn.pixabay.com/photo/2014/10/23/18/05/burger-500054_1280.jpg' },

    ]
  ),
];
