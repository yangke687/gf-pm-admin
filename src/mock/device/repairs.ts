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
      cause: '测试',
      status: '正常',
      createdAt: '2021-05-21',
      createdBy: '管理员'
    },
    {
      id: 2,
      no: 'SB015595',
      name: '景观灯',
      cat: '景观灯',
      cnt: 1,
      project: '都铎城邦 (云秀2期)',
      district: '都铎城邦（云秀）6号院',
      pos: '6号院正大门进口柱头灯',
      cause: '测试',
      status: '正常',
      createdAt: '2021-05-21',
      createdBy: '管理员'
    },
    {
      id: 3,
      no: 'SB015595',
      name: '景观灯',
      cat: '景观灯',
      cnt: 1,
      project: '都铎城邦 (云秀2期)',
      district: '都铎城邦（云秀）6号院',
      pos: '6号院正大门进口柱头灯',
      cause: '测试',
      status: '正常',
      createdAt: '2021-05-21',
      createdBy: '管理员'
    }
  ],
  attrs: [
    { label: '项目（楼盘', value: 'project', width: 200, type: 'text' },
    { label: '片区', value: 'district', width: 200, type: 'text' },
    { label: '位置', value: 'pos', width: 200, type: 'textarea' },
    { label: '设备编码', value: 'no', width: 120, type: 'text' },
    { label: '设备名称', value: 'name', type: 'text' },
    { label: '故障原因', value: 'cause', type: 'text' },
    { label: '维修结果', value: 'status', type: 'text' },
    { label: '维修日期', value: 'createdAt', width: 150, type: 'date' },
    { label: '处理人', value: 'createdBy', type: 'text' }
  ],
  meta: {
    pagination: {
      pageSize: 1,
      currentPage: 1,
      totalPages: 3
    }
  }
}
