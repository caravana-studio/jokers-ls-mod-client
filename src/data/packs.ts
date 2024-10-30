import { CardDataMap } from "../types/CardData";
import i18n from 'i18next';

export const PACKS_DATA: CardDataMap = {};

const loadTranslations = async () => {
  await i18n.loadNamespaces(['packs']);

  Object.assign(PACKS_DATA, {
    1: {
      name: i18n.t('packsData.1.name', {ns:'packs'}),
      description: i18n.t('packsData.1.description', {ns:'packs'}),
      details: i18n.t('packsData.1.details', {ns:'packs'}),
    },
    2: {
      name: i18n.t('packsData.2.name', {ns:'packs'}),
      description: i18n.t('packsData.2.description', {ns:'packs'}),
      details: i18n.t('packsData.2.details', {ns:'packs'}),
    },
    3: {
      name: i18n.t('packsData.3.name', {ns:'packs'}),
      description: i18n.t('packsData.3.description', {ns:'packs'}),
      details: i18n.t('packsData.3.details', {ns:'packs'}),
    },
    4: {
      name: i18n.t('packsData.4.name', {ns:'packs'}),
      description: i18n.t('packsData.4.description', {ns:'packs'}),
      details: i18n.t('packsData.4.details', {ns:'packs'}),
    },
    5: {
      name: i18n.t('packsData.5.name', {ns:'packs'}),
      description: i18n.t('packsData.5.description', {ns:'packs'}),
      details: i18n.t('packsData.5.details', {ns:'packs'}),
    },
    6: {
      name: i18n.t('packsData.6.name', {ns:'packs'}),
      description: i18n.t('packsData.6.description', {ns:'packs'}),
      details: i18n.t('packsData.6.details', {ns:'packs'}),
    },
    7: {
      name: i18n.t('packsData.7.name', {ns:'packs'}),
      description: i18n.t('packsData.7.description', {ns:'packs'}),
      details: i18n.t('packsData.7.details', {ns:'packs'}),
    },
    8: {
      name: i18n.t('packsData.8.name', {ns:'packs'}),
      description: i18n.t('packsData.8.description', {ns:'packs'}),
      details: i18n.t('packsData.8.details', {ns:'packs'}),
    },
    9: {
      name: i18n.t('packsData.9.name', {ns:'packs'}),
      description: i18n.t('packsData.9.description', {ns:'packs'}),
      details: i18n.t('packsData.9.details', {ns:'packs'}),
    },
  });  
};

i18n.on('initialized', loadTranslations);
i18n.on('languageChanged', loadTranslations);