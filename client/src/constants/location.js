// ключи совпадают со значениями LocationEnum на бэке
export const LOCATIONS = [
  {
    key: 'zhengzhou_warehouse_terminal',
    short: 'Warehouse',
    full: 'Zhengzhou warehouse terminal',
    coord: [34.771717, 113.650565],
  },
  {
    key: 'horgos_xinjiang',
    short: 'Khorgos',
    full: 'Khorgos, Xingjiang',
    coord: [44.169836, 80.435227],
  },
  {
    key: 'nur_zholy_customs_post',
    short: 'CHN-KAZ border',
    full: 'Nur Zholy Customs Post',
    coord: [44.157614, 80.398638],
  },
  {
    key: 'kaz_rus_border',
    short: 'KAZ-RUS border',
    full: 'Kazakhstan - Russia crossing border',
    coord: [50.856132, 56.147562],
  },
  {
    key: 'rus_blr_border',
    short: 'RUS-BLR border',
    full: 'Belarus - Russia crossing border',
    coord: [54.691249, 31.016866],
  },
  {
    key: 'minsk_kolyadichi_auto_ccp',
    short: 'Minsk',
    full: 'Minsk, Kolyadichi-Auto customs clearance point',
    coord: [53.802267, 27.592437],
  },
];

export const LOCATION_BY_KEY = Object.fromEntries(
  LOCATIONS.map(l => [l.key, l])
);

export const LOCATION_OPTIONS = LOCATIONS.map(l => ({
  value: l.key, label: l.full,
}));
