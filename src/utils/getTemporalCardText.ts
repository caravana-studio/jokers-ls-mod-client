import i18n from 'i18next';

export const getTemporalCardText = ( remaining?: number) => {
  return i18n.t('store.preview-card.labels.temporal', { remaining: remaining ? remaining : 3, ns:'store' });
}
