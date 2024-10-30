import { CardDataMap } from "../types/CardData";
import i18n from 'i18next';

export const MODIFIER_CARDS_DATA: CardDataMap = {};

const loadTranslations = async () => {
  await i18n.loadNamespaces(['effects']);

  Object.assign(MODIFIER_CARDS_DATA, {
    600: {
      name: i18n.t('modifierCardsData.600.name', {ns:'effects'}),
      description: i18n.t('modifierCardsData.600.description', {ns:'effects'}),
    },
    601: {
      name: i18n.t('modifierCardsData.601.name', {ns:'effects'}),
      description: i18n.t('modifierCardsData.601.description', {ns:'effects'}),
    },
    602: {
      name: i18n.t('modifierCardsData.602.name', {ns:'effects'}),
      description: i18n.t('modifierCardsData.602.description', {ns:'effects'}),
    },
    603: {
      name: i18n.t('modifierCardsData.603.name', {ns:'effects'}),
      description: i18n.t('modifierCardsData.603.description', {ns:'effects'}),
    },
    604: {
      name: i18n.t('modifierCardsData.604.name', {ns:'effects'}),
      description: i18n.t('modifierCardsData.604.description', {ns:'effects'}),
    },
    605: {
      name: i18n.t('modifierCardsData.605.name', {ns:'effects'}),
      description: i18n.t('modifierCardsData.605.description', {ns:'effects'}),
    },
    606: {
      name: i18n.t('modifierCardsData.606.name', {ns:'effects'}),
      description: i18n.t('modifierCardsData.606.description', {ns:'effects'}),
    },
    607: {
      name: i18n.t('modifierCardsData.607.name', {ns:'effects'}),
      description: i18n.t('modifierCardsData.607.description', {ns:'effects'}),
    },
    608: {
      name: i18n.t('modifierCardsData.608.name', {ns:'effects'}),
      description: i18n.t('modifierCardsData.608.description', {ns:'effects'}),
    },
    609: {
      name: i18n.t('modifierCardsData.609.name', {ns:'effects'}),
      description: i18n.t('modifierCardsData.609.description', {ns:'effects'}),
    },
    610: {
      name: i18n.t('modifierCardsData.610.name', {ns:'effects'}),
      description: i18n.t('modifierCardsData.610.description', {ns:'effects'}),
    },
    611: {
      name: i18n.t('modifierCardsData.611.name', {ns:'effects'}),
      description: i18n.t('modifierCardsData.611.description', {ns:'effects'}),
    }
  });
}

i18n.on('initialized', loadTranslations);
i18n.on('languageChanged', loadTranslations);