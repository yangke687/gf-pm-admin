export default {
  data: [
    {
      id: 1,
      no: 'SB015595',
      name: '景观灯',
      cat: '景观灯',
      cnt: 1,
      project: '都铎城邦 (云秀2期)',
      district: '都铎城邦（云秀）6号院',
      pos: '6号院正大门进口柱头灯',
      createdAt: '2021-11-11'
    },
    {
      id: 2,
      no: 'SB015596',
      name: '景观灯',
      cat: '景观灯',
      cnt: 1,
      project: '都铎城邦 (云秀2期)',
      district: '都铎城邦（云秀）6号院',
      pos: '6号院正大门进口柱头灯',
      createdAt: '2021-11-11'
    },
    {
      id: 3,
      no: 'SB015597',
      name: '景观灯',
      cat: '景观灯',
      cnt: 1,
      project: '都铎城邦 (云秀2期)',
      district: '都铎城邦（云秀）6号院',
      pos: '6号院正大门进口柱头灯',
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
      label: '创建时间',
      value: 'createdAt',
      type: 'date',
      sortable: true,
      filterable: true
    }
  ],
  meta: {
    pagination: {
      pageSize: 1,
      currentPage: 1,
      totalPages: 3
    }
  }
}
