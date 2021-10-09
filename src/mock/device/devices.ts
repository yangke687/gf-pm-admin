export default {
  data: [
    {
      id: 1,
      no: 'SB015595',
      name: '景观灯1',
      cat: '室外',
      cnt: 1,
      project: '都铎城邦 (云秀2期)',
      district: '都铎城邦（云秀）6号院',
      pos: '6号院正大门进口柱头灯',
      barcode: 1,
      system: ['分类一', '分类二'],
      createdAt: '2021-11-11'
    },
    {
      id: 2,
      no: 'SB015596',
      name: '景观灯2',
      cat: '室外',
      cnt: 1,
      project: '都铎城邦 (云秀2期)',
      district: '都铎城邦（云秀）6号院',
      pos: '6号院正大门进口柱头灯',
      barcode: 0,
      system: [],
      createdAt: '2021-11-11'
    },
    {
      id: 3,
      no: 'SB015597',
      name: '景观灯3',
      cat: '室外',
      cnt: 1,
      project: '都铎城邦 (云秀2期)',
      district: '都铎城邦（云秀）6号院',
      pos: '6号院正大门进口柱头灯',
      barcode: 1,
      system: ['分类一'],
      createdAt: '2021-11-11'
    }
  ],
  attrs: [
    {
      label: '设备编码',
      value: 'no',
      width: 120,
      type: 'text',
      filterable: true
    },
    {
      label: '设备名称',
      value: 'name',
      type: 'text',
      filterable: true
    },
    {
      label: '设备分类',
      value: 'cat',
      type: 'select',
      options: [
        { label: '室内', value: '室内' },
        { label: '室外', value: '室外' }
      ],
      filterable: true
    },
    { label: '项目（楼盘)', value: 'project', width: 200, type: 'text' },
    { label: '片区', value: 'district', width: 200, type: 'text' },
    { label: '位置', value: 'pos', width: 200, type: 'textarea' },
    { label: '数量', value: 'cnt', type: 'text' },
    {
      label: '二维码',
      value: 'barcode',
      type: 'radio',
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 }
      ]
    },
    {
      label: '系统分类',
      value: 'system',
      type: 'checkbox',
      options: [{ label: '分类一' }, { label: '分类二' }, { label: '分类三' }]
    },
    {
      label: '创建时间',
      value: 'createdAt',
      type: 'date',
      sortable: true,
      filterable: true
    }
  ],
  meta: {
    pagination: {
      pageSize: 10,
      currentPage: 1,
      total: 3
    }
  }
}
