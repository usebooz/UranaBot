/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  ColorHex: { input: any; output: any; }
  /** Скаляр времени в формате rfc3339 */
  Time: { input: any; output: any; }
  TimeSecond: { input: any; output: any; }
  URL: { input: any; output: any; }
};

export type AmateurFilterArgs = {
  cityID?: InputMaybe<Scalars['Int']['input']>;
  cityWebname?: InputMaybe<Scalars['String']['input']>;
  countryID?: InputMaybe<Scalars['Int']['input']>;
  countryWebname?: InputMaybe<Scalars['String']['input']>;
  disciplineID?: InputMaybe<Scalars['Int']['input']>;
  disciplineWebname?: InputMaybe<Scalars['String']['input']>;
  month?: InputMaybe<Scalars['Int']['input']>;
  onlyMajor?: InputMaybe<Scalars['Boolean']['input']>;
  sportID?: InputMaybe<Scalars['Int']['input']>;
  sportWebname?: InputMaybe<Scalars['String']['input']>;
  year: Scalars['Int']['input'];
};

export type AmateurPaginatorArgs = {
  cursorTimestamp?: InputMaybe<Scalars['Int']['input']>;
  lastStageID?: InputMaybe<Scalars['Int']['input']>;
  limit: Scalars['Int']['input'];
};

export enum AmateurScheduleStageStatus {
  Cancelled = 'CANCELLED',
  Live = 'LIVE',
  Postponed = 'POSTPONED',
  Scheduled = 'SCHEDULED'
}

export type AmateurSportsInput = {
  filter: AmateurFilterArgs;
  paginator?: InputMaybe<AmateurPaginatorArgs>;
};

export type AmateurSportsPictureLogoInput = {
  ext?: PictureExtension;
  resize?: PictureLogoSize;
};

export type Animation = {
  desktop: Scalars['String']['input'];
  mobile: Scalars['String']['input'];
};

export enum AppLang {
  En = 'EN',
  Ru = 'RU'
}

export enum AppScreen {
  FootballLiveList = 'FOOTBALL_LIVE_LIST',
  FootballMatchCenter = 'FOOTBALL_MATCH_CENTER',
  FootballMatchDetails = 'FOOTBALL_MATCH_DETAILS'
}

export enum AppTheme {
  Dark = 'DARK',
  Light = 'LIGHT'
}

/** Типы списков стоп-листов */
export enum ApplyingType {
  BlogPost = 'BLOG_POST',
  Comments = 'COMMENTS'
}

export type ArtefactSaveObjectInput = {
  /** ID объекта */
  artefactID: Scalars['ID']['input'];
};

export enum AuthChangeUserPasswordErrorCode {
  EmptyPassword = 'EMPTY_PASSWORD',
  EqualOldNewPassword = 'EQUAL_OLD_NEW_PASSWORD',
  InvalidToken = 'INVALID_TOKEN',
  PasswordWrongLength = 'PASSWORD_WRONG_LENGTH',
  TokenExpired = 'TOKEN_EXPIRED',
  TokenHasAlreadyBeenUsed = 'TOKEN_HAS_ALREADY_BEEN_USED'
}

export enum AuthSendResetUserPasswordLinkErrorCode {
  LimitReached = 'LIMIT_REACHED',
  UserNotFound = 'USER_NOT_FOUND'
}

export enum AutoSetTagsDocType {
  News = 'NEWS',
  Post = 'POST'
}

export type AutoSetTagsInput = {
  docType: AutoSetTagsDocType;
  sectionsIDs?: InputMaybe<Array<Scalars['ID']['input']>>;
  structuredBody: Scalars['String']['input'];
  tagsIDs?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export enum BadgeStatus {
  Active = 'ACTIVE',
  Disable = 'DISABLE',
  Hidden = 'HIDDEN'
}

export type BettingArgs = {
  /** Фильтр по букмекерам (если нет, то возвращаются все) */
  bookmaker?: InputMaybe<Array<BookmakerName>>;
};

export type BettingGroupArgs = {
  iso2Country?: InputMaybe<Scalars['String']['input']>;
  placementName: Scalars['String']['input'];
};

export type BettingPlacementArgs = {
  /** код страны */
  iso2Country?: InputMaybe<Scalars['String']['input']>;
  /** тип размещения строка */
  placementName?: InputMaybe<Scalars['String']['input']>;
  /** тип размещения */
  placementType?: InputMaybe<OddsPlacement>;
  /** заполняется только если placementType = SPECIAL_URL */
  url?: InputMaybe<Scalars['String']['input']>;
};

export enum BettingWidgetContentType {
  Team = 'TEAM',
  Tournament = 'TOURNAMENT'
}

export enum BettingWidgetDocumentType {
  News = 'NEWS',
  Post = 'POST'
}

export enum BettingWidgetSportType {
  Football = 'FOOTBALL'
}

export enum BettingWidgetTagType {
  Team = 'TEAM',
  Tournament = 'TOURNAMENT'
}

/** постоянное или временное добавление в ЧС */
export enum BlacklistTimeType {
  /** постоянно */
  Permanent = 'PERMANENT',
  /** временно */
  Temporary = 'TEMPORARY'
}

export enum BookmakerName {
  Betboom = 'BETBOOM',
  Betcity = 'BETCITY',
  Betera = 'BETERA',
  Bettera = 'BETTERA',
  Fonbet = 'FONBET',
  Ggbet = 'GGBET',
  Ligastavok = 'LIGASTAVOK',
  Marathon = 'MARATHON',
  Olimp = 'OLIMP',
  Onexbet = 'ONEXBET',
  OnexbetKz = 'ONEXBET_KZ',
  Onexstavka = 'ONEXSTAVKA',
  Pari = 'PARI',
  Paribet = 'PARIBET',
  Parimatch = 'PARIMATCH',
  TennisiKz = 'TENNISI_KZ',
  Winline = 'WINLINE'
}

export type BookmakerRatingActivateAppInput = {
  /** Идентификатор */
  id: Scalars['ID']['input'];
};

export type BookmakerRatingActivateQuestionInput = {
  /** Идентификатор */
  id: Scalars['ID']['input'];
};

export type BookmakerRatingAddAppsToListInput = {
  /** ID приложений */
  appIDs: Array<Scalars['ID']['input']>;
  /** ID списка */
  listID: Scalars['ID']['input'];
};

export type BookmakerRatingAddBonusesToListInput = {
  /** Бонусы в рейтинге */
  listBonuses: Array<BookmakerRatingCreateListBonusInput>;
  /** ID списка */
  listID: Scalars['ID']['input'];
};

export type BookmakerRatingAddBookmakersToListInput = {
  /** ID букмекеров */
  bookmakerIDs: Array<Scalars['ID']['input']>;
  /** ID списка */
  listID: Scalars['ID']['input'];
};

/** Амбассадор */
export type BookmakerRatingAmbassadorInput = {
  /** Активен или нет */
  isActive: Scalars['Boolean']['input'];
  /** Логотип */
  logo: Scalars['String']['input'];
  /** Название */
  title: Scalars['String']['input'];
  /** Ссылка */
  url: Scalars['String']['input'];
};

/** Фильтры приложений */
export enum BookmakerRatingAppFilter {
  Active = 'ACTIVE',
  All = 'ALL'
}

/** Фильтр по истекшести */
export enum BookmakerRatingBonusExpiredFilter {
  All = 'ALL',
  Current = 'CURRENT',
  Expired = 'EXPIRED'
}

/** Фильтры бонусов */
export enum BookmakerRatingBonusFilter {
  Active = 'ACTIVE',
  All = 'ALL'
}

/** Сортировка бонусов */
export enum BookmakerRatingBonusOrder {
  Priority = 'PRIORITY',
  ShuffleGroup = 'SHUFFLE_GROUP'
}

/** Отображения бонусов */
export enum BookmakerRatingBonusView {
  Normal = 'NORMAL',
  Promo = 'PROMO'
}

/** Фильтры букмекеров */
export enum BookmakerRatingBookmakerFilter {
  Active = 'ACTIVE',
  All = 'ALL'
}

/** Трансляция */
export type BookmakerRatingBroadcastInput = {
  /** Активна или нет */
  isActive: Scalars['Boolean']['input'];
  /** Логотип */
  logo: Scalars['String']['input'];
  /** Название */
  title: Scalars['String']['input'];
  /** Ссылка */
  url: Scalars['String']['input'];
};

/** Тип объекта куда ведет кнопка */
export enum BookmakerRatingButtonTarget {
  Bonus = 'BONUS',
  Site = 'SITE'
}

/** Тип кнопок */
export enum BookmakerRatingButtonType {
  Custom = 'CUSTOM',
  Default = 'DEFAULT'
}

export type BookmakerRatingCreateAppInput = {
  /** ID букмекера */
  bookmakerID: Scalars['ID']['input'];
  /** Описание в формате SB */
  content: Scalars['String']['input'];
  /** Мета-описание */
  description: Scalars['String']['input'];
  /** Количество загрузок */
  downloads: Scalars['String']['input'];
  /** Заголовок H1 */
  heading: Scalars['String']['input'];
  /** Ссылка на установку */
  installURL: Scalars['String']['input'];
  /** Заголовок страницы */
  pageTitle: Scalars['String']['input'];
  /** Платформа */
  platform: BookmakerRatingPlatform;
  /** Дата публикации обзора */
  publishedAt?: InputMaybe<Scalars['String']['input']>;
  /** Размер приложения */
  size: Scalars['String']['input'];
  /** Слаг для URL */
  slug: Scalars['String']['input'];
  /** Название */
  title: Scalars['String']['input'];
};

export type BookmakerRatingCreateBonusInput = {
  /** Активации */
  activations: Scalars['Int']['input'];
  /** Цвет фона */
  background: Scalars['String']['input'];
  /** ID букмекера */
  bookmakerID: Scalars['ID']['input'];
  /** Описание */
  content: Scalars['String']['input'];
  /** Мета-описание страницы */
  description: Scalars['String']['input'];
  /** Окончание акции */
  finishedAt?: InputMaybe<Scalars['String']['input']>;
  /** ID шапки */
  headerID: Scalars['ID']['input'];
  /** Заголовок H1 */
  heading: Scalars['String']['input'];
  /** Картинка */
  image: Scalars['String']['input'];
  /** Активен или нет */
  isActive: Scalars['Boolean']['input'];
  /** Отображать ли в списке лучших */
  isBest: Scalars['Boolean']['input'];
  /** Выставить главным бонусом букмекера или нет */
  isMain?: InputMaybe<Scalars['Boolean']['input']>;
  /** Краткое описание */
  lead: Scalars['String']['input'];
  /** Заголовок страницы */
  pageTitle: Scalars['String']['input'];
  /** Промокод */
  promocode: Scalars['String']['input'];
  /** Дата публикации обзора */
  publishedAt: Scalars['String']['input'];
  /** Слаг для URL */
  slug: Scalars['String']['input'];
  /** Сумма бонуса */
  value: Scalars['Int']['input'];
  /** Вид отображения */
  view: BookmakerRatingBonusView;
  /** Вординг */
  wording: Scalars['String']['input'];
};

export type BookmakerRatingCreateBookmakerInput = {
  /** Информация о рекламодателе */
  advertiserInfo: Scalars['String']['input'];
  /** Амбассадоры */
  ambassadors: Array<BookmakerRatingAmbassadorInput>;
  /** ID рейтинга приложений букмекера */
  appListID?: InputMaybe<Scalars['ID']['input']>;
  /** ID рейтинга бонусов букмекера */
  bonusListID?: InputMaybe<Scalars['ID']['input']>;
  /** Трансляции */
  broadcasts: Array<BookmakerRatingBroadcastInput>;
  /** Недостатки */
  cons: Scalars['String']['input'];
  /** Описание в формате SB */
  content: Scalars['String']['input'];
  /** Мета-описание основной страницы */
  descriptionMain: Scalars['String']['input'];
  /** Мета-описание страницы отзывов */
  descriptionReviews: Scalars['String']['input'];
  /** Код страны в формате ISO2 */
  geo: Scalars['String']['input'];
  /** Заголовок H1 */
  heading: Scalars['String']['input'];
  /** Маленький логотип (иконка) */
  icon: Scalars['String']['input'];
  /** Активен или нет */
  isActive: Scalars['Boolean']['input'];
  /** Юридическая информация */
  legalInfo: Array<BookmakerRatingInfoInput>;
  /** Статус легальности */
  legalStatusID?: InputMaybe<Scalars['ID']['input']>;
  /** Логотип */
  logo: Scalars['String']['input'];
  /** Маржа */
  margin: Scalars['String']['input'];
  /** Минимальный депозит */
  minDeposit: Scalars['Int']['input'];
  /** Заголовок основной страницы */
  pageTitleMain: Scalars['String']['input'];
  /** Заголовок страницы отзывов */
  pageTitleReviews: Scalars['String']['input'];
  /** Способы оплаты */
  paymentMethods: Array<BookmakerRatingPaymentMethodInput>;
  /** Преимущества */
  pros: Scalars['String']['input'];
  /** Дата публикации обзора */
  publishedAt: Scalars['String']['input'];
  /** Оценки Sports.ru */
  score: BookmakerRatingScoreInput;
  /** DEPRECATED Ссылка для поисковиков (Не используется) */
  searchURL?: InputMaybe<Scalars['String']['input']>;
  /** Слаг для URL */
  slug: Scalars['String']['input'];
  /** Теги */
  tags: Array<Scalars['ID']['input']>;
  /** Название */
  title: Scalars['String']['input'];
  /** DEPRECATED Ссылка (Не используется) */
  url?: InputMaybe<Scalars['String']['input']>;
};

export type BookmakerRatingCreateHeaderInput = {
  /** Цвет фона шапки в формате RGB */
  background: Scalars['String']['input'];
  /** ID букмекера */
  bookmakerID: Scalars['ID']['input'];
  /** Список кнопок */
  buttons: Array<BookmakerRatingHeaderButtonInput>;
  /** Текст в шапке */
  content: Scalars['String']['input'];
  /** Фоновая картинка */
  image: Scalars['String']['input'];
  /** Активно или нет */
  isActive: Scalars['Boolean']['input'];
  /** Признак шапки приложения */
  isApp: Scalars['Boolean']['input'];
  /** Вид отображения */
  view: BookmakerRatingHeaderView;
};

export type BookmakerRatingCreateListBonusInput = {
  /** ID бонуса */
  bonusID: Scalars['ID']['input'];
  /** Группа рандомизации бонуса */
  shuffleGroup?: InputMaybe<Scalars['Int']['input']>;
};

export type BookmakerRatingCreateListInput = {
  /** Нижнее описание в формате SB */
  bottomContent: Scalars['String']['input'];
  /** Мета-описание */
  description: Scalars['String']['input'];
  /** Заголовок H1 */
  heading: Scalars['String']['input'];
  /** Признак доступности в методах получения случайных рейтингов */
  includeInRandom: Scalars['Boolean']['input'];
  /** Является ли списком по умолчанию */
  isDefault: Scalars['Boolean']['input'];
  /** Заголовок страницы */
  pageTitle: Scalars['String']['input'];
  /** Нужно ли показывать истекшие бонусы */
  showExpiredBonuses?: InputMaybe<Scalars['Boolean']['input']>;
  /** Букмекер для кастомного слайдера */
  sliderBookmakerID?: InputMaybe<Scalars['ID']['input']>;
  /** Активирован ли кастомный слайдер бонусов */
  sliderEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** Заголовок кастомного слайдера */
  sliderTitle?: InputMaybe<Scalars['String']['input']>;
  /** Слаг для URL */
  slug: Scalars['String']['input'];
  /** Название */
  title: Scalars['String']['input'];
  /** Верхнее описание в формате SB */
  topContent: Scalars['String']['input'];
  /** Тип */
  type: BookmakerRatingListType;
};

export type BookmakerRatingCreateQuestionInput = {
  /** Ответ */
  answer: Scalars['String']['input'];
  /** Используется несколько ответов или нет */
  isMultipleAnswers?: InputMaybe<Scalars['Boolean']['input']>;
  /** ID объекта */
  objectID: Scalars['ID']['input'];
  /** Тип объекта */
  objectType: BookmakerRatingObjectType;
  /** Текст вопроса */
  question: Scalars['String']['input'];
};

export type BookmakerRatingCreateReviewInput = {
  /** ID букмекера */
  bookmakerID?: InputMaybe<Scalars['ID']['input']>;
  /** Оценка */
  score: Scalars['Int']['input'];
  /** Текст отзыва */
  text: Scalars['String']['input'];
};

export type BookmakerRatingCreateScreenshotInput = {
  /** ID приложения */
  appID: Scalars['ID']['input'];
  /** Ссылка на картинку */
  image: Scalars['String']['input'];
  /** Активен или нет */
  isActive: Scalars['Boolean']['input'];
  /** Ссылка для перехода */
  url?: InputMaybe<Scalars['String']['input']>;
};

export type BookmakerRatingDeactivateAppInput = {
  /** Идентификатор */
  id: Scalars['ID']['input'];
};

export type BookmakerRatingDeactivateQuestionInput = {
  /** Идентификатор */
  id: Scalars['ID']['input'];
};

export type BookmakerRatingDeleteAppInput = {
  /** Идентификатор */
  id: Scalars['ID']['input'];
};

export type BookmakerRatingDeleteBonusInput = {
  /** Идентификатор */
  id: Scalars['ID']['input'];
};

export type BookmakerRatingDeleteBookmakerInput = {
  /** Идентификатор */
  id: Scalars['ID']['input'];
};

export type BookmakerRatingDeleteHeaderInput = {
  /** Идентификатор */
  id: Scalars['ID']['input'];
};

export type BookmakerRatingDeleteListInput = {
  /** Идентификатор */
  id: Scalars['ID']['input'];
};

export type BookmakerRatingDeleteQuestionInput = {
  /** Идентификатор */
  id: Scalars['ID']['input'];
};

export type BookmakerRatingDeleteReviewInput = {
  /** Идентификатор */
  id: Scalars['ID']['input'];
};

export type BookmakerRatingDeleteReviewsByUserInput = {
  /** ID пользователя */
  userID: Scalars['ID']['input'];
};

export type BookmakerRatingDeleteScreenshotInput = {
  /** Идентификатор */
  id: Scalars['ID']['input'];
};

export type BookmakerRatingEditAppInput = {
  /** ID букмекера */
  bookmakerID: Scalars['ID']['input'];
  /** Описание в формате SB */
  content: Scalars['String']['input'];
  /** Мета-описание */
  description: Scalars['String']['input'];
  /** Количество загрузок */
  downloads: Scalars['String']['input'];
  /** Заголовок H1 */
  heading: Scalars['String']['input'];
  /** Идентификатор */
  id: Scalars['ID']['input'];
  /** Ссылка на установку */
  installURL: Scalars['String']['input'];
  /** Заголовок страницы */
  pageTitle: Scalars['String']['input'];
  /** Платформа */
  platform: BookmakerRatingPlatform;
  /** Дата публикации обзора */
  publishedAt?: InputMaybe<Scalars['String']['input']>;
  /** Размер приложения */
  size: Scalars['String']['input'];
  /** Слаг для URL */
  slug: Scalars['String']['input'];
  /** Название */
  title: Scalars['String']['input'];
};

export type BookmakerRatingEditBonusInput = {
  /** Активации */
  activations: Scalars['Int']['input'];
  /** Цвет фона */
  background: Scalars['String']['input'];
  /** Описание */
  content: Scalars['String']['input'];
  /** Мета-описание страницы */
  description: Scalars['String']['input'];
  /** Окончание акции */
  finishedAt?: InputMaybe<Scalars['String']['input']>;
  /** ID шапки */
  headerID: Scalars['ID']['input'];
  /** Заголовок H1 */
  heading: Scalars['String']['input'];
  /** Идентификатор */
  id: Scalars['ID']['input'];
  /** Картинка */
  image: Scalars['String']['input'];
  /** Активен или нет */
  isActive: Scalars['Boolean']['input'];
  /** Отображать ли в списке лучших */
  isBest: Scalars['Boolean']['input'];
  /** Выставить главным бонусом букмекера или нет */
  isMain?: InputMaybe<Scalars['Boolean']['input']>;
  /** Краткое описание */
  lead: Scalars['String']['input'];
  /** Заголовок страницы */
  pageTitle: Scalars['String']['input'];
  /** Промокод */
  promocode: Scalars['String']['input'];
  /** Дата публикации обзора */
  publishedAt: Scalars['String']['input'];
  /** Слаг для URL */
  slug: Scalars['String']['input'];
  /** Сумма бонуса */
  value: Scalars['Int']['input'];
  /** Вид отображения */
  view: BookmakerRatingBonusView;
  /** Вординг */
  wording: Scalars['String']['input'];
};

export type BookmakerRatingEditBookmakerInput = {
  /** Информация о рекламодателе */
  advertiserInfo: Scalars['String']['input'];
  /** Амбассадоры */
  ambassadors: Array<BookmakerRatingAmbassadorInput>;
  /** ID рейтинга приложений букмекера */
  appListID?: InputMaybe<Scalars['ID']['input']>;
  /** ID рейтинга бонусов букмекера */
  bonusListID?: InputMaybe<Scalars['ID']['input']>;
  /** Трансляции */
  broadcasts: Array<BookmakerRatingBroadcastInput>;
  /** Недостатки */
  cons: Scalars['String']['input'];
  /** Описание в формате SB */
  content: Scalars['String']['input'];
  /** Мета-описание основной страницы */
  descriptionMain: Scalars['String']['input'];
  /** Мета-описание страницы отзывов */
  descriptionReviews: Scalars['String']['input'];
  /** Код страны в формате ISO2 */
  geo: Scalars['String']['input'];
  /** Заголовок H1 */
  heading: Scalars['String']['input'];
  /** Маленький логотип (иконка) */
  icon: Scalars['String']['input'];
  /** Идентификатор */
  id: Scalars['ID']['input'];
  /** Активен или нет */
  isActive: Scalars['Boolean']['input'];
  /** Юридическая информация */
  legalInfo: Array<BookmakerRatingInfoInput>;
  /** Статус легальности */
  legalStatusID?: InputMaybe<Scalars['ID']['input']>;
  /** Логотип */
  logo: Scalars['String']['input'];
  /** Маржа */
  margin: Scalars['String']['input'];
  /** Минимальный депозит */
  minDeposit: Scalars['Int']['input'];
  /** Заголовок основной страницы */
  pageTitleMain: Scalars['String']['input'];
  /** Заголовок страницы отзывов */
  pageTitleReviews: Scalars['String']['input'];
  /** Способы оплаты */
  paymentMethods: Array<BookmakerRatingPaymentMethodInput>;
  /** Преимущества */
  pros: Scalars['String']['input'];
  /** Дата публикации обзора */
  publishedAt: Scalars['String']['input'];
  /** Оценки Sports.ru */
  score: BookmakerRatingScoreInput;
  /** DEPRECATED Ссылка для поисковиков (Не используется) */
  searchURL?: InputMaybe<Scalars['String']['input']>;
  /** Слаг для URL */
  slug: Scalars['String']['input'];
  /** Теги */
  tags: Array<Scalars['ID']['input']>;
  /** Название */
  title: Scalars['String']['input'];
  /** DEPRECATED Ссылка (Не используется) */
  url?: InputMaybe<Scalars['String']['input']>;
};

export type BookmakerRatingEditHeaderInput = {
  /** Цвет фона шапки в формате RGB */
  background: Scalars['String']['input'];
  /** Список кнопок */
  buttons: Array<BookmakerRatingHeaderButtonInput>;
  /** Текст в шапке */
  content: Scalars['String']['input'];
  /** ID шапки */
  id: Scalars['ID']['input'];
  /** Фоновая картинка */
  image: Scalars['String']['input'];
  /** Активно или нет */
  isActive: Scalars['Boolean']['input'];
  /** Признак шапки приложения */
  isApp: Scalars['Boolean']['input'];
  /** Вид отображения */
  view: BookmakerRatingHeaderView;
};

export type BookmakerRatingEditListBonusInput = {
  /** ID бонуса */
  bonusID: Scalars['ID']['input'];
  /** Группа рандомизации бонуса */
  shuffleGroup?: InputMaybe<Scalars['Int']['input']>;
};

export type BookmakerRatingEditListBonusesInput = {
  /** Бонусы в рейтинге */
  listBonuses: Array<BookmakerRatingEditListBonusInput>;
  /** ID списка */
  listID: Scalars['ID']['input'];
};

export type BookmakerRatingEditListInput = {
  /** Нижнее описание в формате SB */
  bottomContent: Scalars['String']['input'];
  /** Мета-описание */
  description: Scalars['String']['input'];
  /** Заголовок H1 */
  heading: Scalars['String']['input'];
  /** Идентификатор */
  id: Scalars['ID']['input'];
  /** Признак доступности в методах получения случайных рейтингов */
  includeInRandom: Scalars['Boolean']['input'];
  /** Является ли списком по умолчанию */
  isDefault: Scalars['Boolean']['input'];
  /** Заголовок страницы */
  pageTitle: Scalars['String']['input'];
  /** Порядок */
  priority: Scalars['Int']['input'];
  /** Нужно ли показывать истекшие бонусы */
  showExpiredBonuses?: InputMaybe<Scalars['Boolean']['input']>;
  /** Букмекер для кастомного слайдера */
  sliderBookmakerID?: InputMaybe<Scalars['ID']['input']>;
  /** Активирован ли кастомный слайдер бонусов */
  sliderEnabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** Заголовок кастомного слайдера */
  sliderTitle?: InputMaybe<Scalars['String']['input']>;
  /** Слаг для URL */
  slug: Scalars['String']['input'];
  /** Название */
  title: Scalars['String']['input'];
  /** Верхнее описание в формате SB */
  topContent: Scalars['String']['input'];
};

export type BookmakerRatingEditQuestionInput = {
  /** Ответ */
  answer: Scalars['String']['input'];
  /** Идентификатор */
  id: Scalars['ID']['input'];
  /** Используется несколько ответов или нет */
  isMultipleAnswers?: InputMaybe<Scalars['Boolean']['input']>;
  /** Порядок */
  priority: Scalars['Int']['input'];
  /** Текст вопроса */
  question: Scalars['String']['input'];
};

export type BookmakerRatingEditReviewInput = {
  /** Идентификатор */
  id: Scalars['ID']['input'];
  /** Оценка */
  score: Scalars['Int']['input'];
  /** Текст отзыва */
  text: Scalars['String']['input'];
};

export type BookmakerRatingEditScreenshotInput = {
  /** Идентификатор */
  id: Scalars['ID']['input'];
  /** Ссылка на картинку */
  image: Scalars['String']['input'];
  /** Активно или нет */
  isActive: Scalars['Boolean']['input'];
  /** Порядок */
  priority: Scalars['Int']['input'];
  /** Ссылка для перехода */
  url?: InputMaybe<Scalars['String']['input']>;
};

export type BookmakerRatingHeaderButtonInput = {
  /** Фон кнопки */
  background?: InputMaybe<Scalars['String']['input']>;
  /** Фон кнопки при наведении */
  hover?: InputMaybe<Scalars['String']['input']>;
  /** Ссылка для поисковиков */
  searchURL: Scalars['String']['input'];
  /** Тип объекта куда ведет кнопка */
  target: BookmakerRatingButtonTarget;
  /** Текст кнопки */
  text: Scalars['String']['input'];
  /** Тип кнопки */
  type: BookmakerRatingButtonType;
  /** Ссылка для кнопки */
  url: Scalars['String']['input'];
};

/** Вид отображения шапки */
export enum BookmakerRatingHeaderView {
  Normal = 'NORMAL',
  Promo = 'PROMO'
}

/** Информация (имя/значение) */
export type BookmakerRatingInfoInput = {
  /** Название */
  name: Scalars['String']['input'];
  /** Значение */
  value: Scalars['String']['input'];
};

/** Типы списков */
export enum BookmakerRatingListType {
  App = 'APP',
  Bonus = 'BONUS',
  Bookmaker = 'BOOKMAKER'
}

export type BookmakerRatingMoveAppInListInput = {
  /** ID приложения */
  appID: Scalars['ID']['input'];
  /** ID списка */
  listID: Scalars['ID']['input'];
  /** Порядок */
  priority: Scalars['Int']['input'];
};

export type BookmakerRatingMoveBonusInListInput = {
  /** ID бонуса */
  bonusID: Scalars['ID']['input'];
  /** ID списка */
  listID: Scalars['ID']['input'];
  /** Порядок */
  priority: Scalars['Int']['input'];
};

export type BookmakerRatingMoveBookmakerInListInput = {
  /** ID букмекера */
  bookmakerID: Scalars['ID']['input'];
  /** ID списка */
  listID: Scalars['ID']['input'];
  /** Порядок */
  priority: Scalars['Int']['input'];
};

/** Типы объектов */
export enum BookmakerRatingObjectType {
  App = 'APP',
  Bonus = 'BONUS',
  Bookmaker = 'BOOKMAKER',
  List = 'LIST',
  Reviews = 'REVIEWS'
}

/** Способ оплаты */
export type BookmakerRatingPaymentMethodInput = {
  /** Платёжная система */
  paymentSystemID: Scalars['ID']['input'];
  /** Пополнение */
  topUp: Array<BookmakerRatingInfoInput>;
  /** Вывод */
  withdrawal: Array<BookmakerRatingInfoInput>;
};

/** Платёжные системы */
export enum BookmakerRatingPaymentSystemLegacy {
  Mastercard = 'MASTERCARD',
  Mir = 'MIR',
  Visa = 'VISA'
}

/** Платформы */
export enum BookmakerRatingPlatform {
  Android = 'ANDROID',
  Ios = 'IOS'
}

export type BookmakerRatingRemoveAppsFromListInput = {
  /** ID приложения */
  appIDs: Array<Scalars['ID']['input']>;
  /** ID списка */
  listID: Scalars['ID']['input'];
};

export type BookmakerRatingRemoveBonusesFromListInput = {
  /** ID бонусов */
  bonusIDs: Array<Scalars['ID']['input']>;
  /** ID списка */
  listID: Scalars['ID']['input'];
};

export type BookmakerRatingRemoveBookmakersFromListInput = {
  /** ID букмекеров */
  bookmakerIDs: Array<Scalars['ID']['input']>;
  /** ID списка */
  listID: Scalars['ID']['input'];
};

/** Сортировка отзывов */
export enum BookmakerRatingReviewOrder {
  Negative = 'NEGATIVE',
  New = 'NEW',
  ScoreThreshold = 'SCORE_THRESHOLD',
  Top = 'TOP'
}

/** Оценки */
export type BookmakerRatingScoreInput = {
  /** Линия */
  line: Scalars['Int']['input'];
  /** Коэффициенты */
  odds: Scalars['Int']['input'];
  /** Поддержка */
  support: Scalars['Int']['input'];
  /** Итоговая */
  total: Scalars['Int']['input'];
  /** Надёжность */
  trustworthy: Scalars['Int']['input'];
  /** Удобство */
  usability: Scalars['Int']['input'];
};

export enum BookmakerReviewAction {
  Ban = 'BAN',
  BanForever = 'BAN_FOREVER',
  Complain = 'COMPLAIN',
  CopyText = 'COPY_TEXT',
  Delete = 'DELETE',
  Edit = 'EDIT'
}

export type BookmarkInput = {
  objectID: Scalars['ID']['input'];
  objectType: BookmarkObjectType;
};

export enum BookmarkObjectType {
  Post = 'POST'
}

export enum BreakingNewsType {
  BreakingNewsMainTags = 'BREAKING_NEWS_MAIN_TAGS',
  BreakingNewsSite = 'BREAKING_NEWS_SITE',
  BreakingNewsSportAndMainTags = 'BREAKING_NEWS_SPORT_AND_MAIN_TAGS'
}

export type BreakingPushInput = {
  body: Scalars['String']['input'];
  breakingType?: InputMaybe<BreakingNewsType>;
  scheduledAt?: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
};

export enum CsEventWinner {
  Draw = 'DRAW',
  Team1 = 'TEAM1',
  Team2 = 'TEAM2'
}

export enum CsMapRoundOutcome {
  BombDefused = 'BOMB_DEFUSED',
  BombExploded = 'BOMB_EXPLODED',
  Draw = 'DRAW',
  TeamKilled = 'TEAM_KILLED'
}

export enum CsSide {
  Ct = 'CT',
  T = 'T',
  Total = 'TOTAL'
}

export enum CampaignStatus {
  Banned = 'BANNED',
  Close = 'CLOSE',
  Complete = 'COMPLETE',
  Delete = 'DELETE',
  Expire = 'EXPIRE',
  Open = 'OPEN'
}

export enum CanAddDraftErrorCode {
  PermissionDenied = 'PERMISSION_DENIED'
}

export type ChangeStatusInput = {
  badgeID: Scalars['ID']['input'];
  status: BadgeStatus;
};

export enum CoalesceNameAttrType {
  FirstName = 'FIRST_NAME',
  LastName = 'LAST_NAME',
  LineupName = 'LINEUP_NAME',
  Name = 'NAME'
}

export enum CommentBanUserErrorCode {
  SelfBanForbidden = 'SELF_BAN_FORBIDDEN',
  Unspecified = 'UNSPECIFIED'
}

export type CommentChangeObjectInput = {
  /** Тип целевого объекта */
  destinationObjectClass: ObjectClass;
  /** ID целевого объекта */
  destinationObjectID: Scalars['ID']['input'];
  /** Тип текущего объекта */
  sourceObjectClass: ObjectClass;
  /** ID текущего объекта */
  sourceObjectID: Scalars['ID']['input'];
};

export enum CommentCreateErrorCode {
  CommentsDisabled = 'COMMENTS_DISABLED',
  CommentDisableReply = 'COMMENT_DISABLE_REPLY',
  CommentDuplicate = 'COMMENT_DUPLICATE',
  CommentTooOften = 'COMMENT_TOO_OFTEN',
  NeedEmailConfirmation = 'NEED_EMAIL_CONFIRMATION',
  TextEmpty = 'TEXT_EMPTY',
  TextTooLong = 'TEXT_TOO_LONG',
  Unauthorized = 'UNAUTHORIZED',
  UserBanned = 'USER_BANNED'
}

export type CommentCreateInput = {
  /** создать удаленный коментарий */
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
  /** значение антихейта */
  hateMetric?: InputMaybe<Scalars['Float']['input']>;
  /** id комментария в формате сервиса (id¦type¦objectid) */
  id?: InputMaybe<Scalars['ID']['input']>;
  /** тип комментируемого объекта (news, post, ...) */
  objectClass: ObjectClass;
  /** id комментируемого объекта */
  objectId: Scalars['ID']['input'];
  /** id родительского комментария (для вложенных) */
  parentId?: InputMaybe<Scalars['ID']['input']>;
  /** текстовый идентификатор платформы */
  platform?: InputMaybe<PlatformType>;
  /** текст комментария */
  text: Scalars['String']['input'];
};

export type CommentDeleteByUserInput = {
  /** дата удаления (начало периода) в формате 'YYYY-MM-DD HH:MI:SS' */
  dateFrom?: InputMaybe<Scalars['String']['input']>;
  /** дата удаления (конец периода) в формате 'YYYY-MM-DD HH:MI:SS' */
  dateTo?: InputMaybe<Scalars['String']['input']>;
  /** id пользователя */
  userID: Scalars['ID']['input'];
};

export enum CommentEditErrorCode {
  CommentsDisabled = 'COMMENTS_DISABLED',
  TextEmpty = 'TEXT_EMPTY',
  Unauthorized = 'UNAUTHORIZED'
}

export type CommentEditInput = {
  /** значение антихейта */
  hateMetric?: InputMaybe<Scalars['Float']['input']>;
  /** id комментария в формате сервиса (id¦type¦objectid) */
  id: Scalars['ID']['input'];
  /** обновленный текст комментария */
  text: Scalars['String']['input'];
};

export type CommentRestoreDonatedInput = {
  /** ID коментраия */
  commentID: Scalars['ID']['input'];
  /** ID доната, необязательный параметр */
  donationID?: InputMaybe<Scalars['ID']['input']>;
  /** значение антихейта, устанавливается если был изменен текст */
  hateMetric?: InputMaybe<Scalars['Float']['input']>;
  /** текст коментрия, если пользователь его отредактировал. Необязательный параметр */
  text?: InputMaybe<Scalars['String']['input']>;
};

export type ContentFootballBettingWidgetInput = {
  bookmaker: BookmakerName;
  contentID: Scalars['ID']['input'];
  contentType: BettingWidgetDocumentType;
};

export type CoordinatesInput = {
  x: Scalars['Int']['input'];
  y: Scalars['Int']['input'];
};

export type CreateEventInput = {
  minusCount: Scalars['Int']['input'];
  objectID: Scalars['ID']['input'];
  objectType: EventObjectClass;
  plusCount: Scalars['Int']['input'];
  targetTime: Scalars['String']['input'];
};

export type CreateItemInput = {
  active: Scalars['Boolean']['input'];
  allowedIn: Array<GeoPermissionCodes>;
  altText?: InputMaybe<Scalars['String']['input']>;
  blockedIn: Array<GeoPermissionCodes>;
  desktopOnly: Scalars['Boolean']['input'];
  externalLink: Scalars['Boolean']['input'];
  icon: Scalars['String']['input'];
  iconContent?: InputMaybe<Scalars['String']['input']>;
  level: Scalars['Int']['input'];
  newTab: Scalars['Boolean']['input'];
  parentID?: InputMaybe<Scalars['ID']['input']>;
  sectionID?: InputMaybe<Scalars['ID']['input']>;
  showInHamburger?: InputMaybe<Scalars['Boolean']['input']>;
  showInMain?: InputMaybe<Scalars['Boolean']['input']>;
  /** Отображаемое название пункта меню */
  text: Scalars['String']['input'];
  /** Всплывающая подсказка - атрибут title */
  titleAttr: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type CreateNewsAdminInput = {
  advertisingDisable?: InputMaybe<Scalars['Boolean']['input']>;
  authorID?: InputMaybe<Scalars['ID']['input']>;
  commentsDisabled?: InputMaybe<Scalars['Boolean']['input']>;
  contentOption?: InputMaybe<Scalars['String']['input']>;
  delayedEvents?: InputMaybe<DelayedEvents>;
  hideAuthor?: InputMaybe<Scalars['Boolean']['input']>;
  hideFromApps?: InputMaybe<Scalars['Boolean']['input']>;
  hideFromIndex?: InputMaybe<Scalars['Boolean']['input']>;
  hideFromWeb?: InputMaybe<Scalars['Boolean']['input']>;
  href?: InputMaybe<Scalars['String']['input']>;
  isUserNews?: InputMaybe<Scalars['Boolean']['input']>;
  main?: InputMaybe<Scalars['Boolean']['input']>;
  mainInSection?: InputMaybe<Scalars['Boolean']['input']>;
  pollID?: InputMaybe<Scalars['Int']['input']>;
  publishedAt?: InputMaybe<Scalars['String']['input']>;
  recommendUntil?: InputMaybe<Scalars['String']['input']>;
  sectionsInfo?: InputMaybe<SectionsInfo>;
  seoDescription?: InputMaybe<Scalars['String']['input']>;
  seoHeader?: InputMaybe<Scalars['String']['input']>;
  seoTitle?: InputMaybe<Scalars['String']['input']>;
  socialImage?: InputMaybe<ImageWithCropInput>;
  sourceTitle?: InputMaybe<Scalars['String']['input']>;
  sourceURL?: InputMaybe<Scalars['String']['input']>;
  status: NewsStatus;
  structuredBody?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<DocumentTagInput>>;
  title: Scalars['String']['input'];
  yandexNewsTitle?: InputMaybe<Scalars['String']['input']>;
};

export type CreateQuestion = {
  /**  Текст вопроса в формате SB  */
  answer: Scalars['String']['input'];
  /**  Привязки к секциям  */
  sections: Array<FaqQuestionSectionInput>;
  /**  Статус (активен, скрыт, удален)  */
  status: FaqQuestionStatus;
  /**  Название вопроса  */
  title: Scalars['String']['input'];
};

export enum CreateReviewErrorCode {
  TextTooLong = 'TEXT_TOO_LONG',
  Unauthorized = 'UNAUTHORIZED'
}

export type CreateSection = {
  /**  SVG иконка для темной темы  */
  iconSvgDark: Scalars['String']['input'];
  /**  SVG иконка для светлой темы  */
  iconSvgLight: Scalars['String']['input'];
  /**  Приоритет в списке  */
  priority: Scalars['Int']['input'];
  /**  Статус (активна, скрыта, удалена)  */
  status: FaqSectionStatus;
  /**  Название секции  */
  title: Scalars['String']['input'];
};

export type CropCoordinatesInput = {
  leftUp: CoordinatesInput;
  rightDown: CoordinatesInput;
};

export type CursorListSeriesArgs = {
  count: Scalars['Int']['input'];
  seriesID?: InputMaybe<Scalars['ID']['input']>;
};

export enum CustomPageObjectType {
  /** @deprecated use TAG object type */
  CyberTournament = 'CYBER_TOURNAMENT',
  DotaMatch = 'DOTA_MATCH',
  Fantasy = 'FANTASY',
  Hub = 'HUB',
  Match = 'MATCH',
  Post = 'POST',
  Predictor = 'PREDICTOR',
  Tag = 'TAG',
  /** @deprecated use TAG object type */
  TagTournament = 'TAG_TOURNAMENT'
}

export type CustomPushCancelInput = {
  pushID: Scalars['ID']['input'];
};

export enum CustomPushErrorCode {
  CodeBadPushStatus = 'CODE_BAD_PUSH_STATUS',
  CodeNewsNotActive = 'CODE_NEWS_NOT_ACTIVE',
  CodeUnspecified = 'CODE_UNSPECIFIED'
}

export type CustomPushInput = {
  body: Scalars['String']['input'];
  bundleList?: InputMaybe<Array<Scalars['String']['input']>>;
  entityID: Scalars['ID']['input'];
  entityType: PushEntityType;
  platformList?: InputMaybe<Array<PushPlatform>>;
  scheduledAt?: InputMaybe<Scalars['String']['input']>;
  sportList?: InputMaybe<Array<Scalars['ID']['input']>>;
  subscriptionType: PushSubscriptionType;
  tagList?: InputMaybe<Array<Scalars['ID']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
  tokens?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CustomPushListInput = {
  amount: Scalars['Int']['input'];
  pageNum: Scalars['Int']['input'];
  statuses?: InputMaybe<Array<CustomPushStatus>>;
};

export type CustomPushRecipientCountInput = {
  bundleList?: InputMaybe<Array<Scalars['String']['input']>>;
  platformList?: InputMaybe<Array<PushPlatform>>;
  sportList?: InputMaybe<Array<Scalars['ID']['input']>>;
  subscriptionType: PushSubscriptionType;
  tagList?: InputMaybe<Array<Scalars['ID']['input']>>;
  tokens?: InputMaybe<Array<Scalars['String']['input']>>;
};

export enum CustomPushStatus {
  Canceled = 'CANCELED',
  Failed = 'FAILED',
  Pending = 'PENDING',
  Sending = 'SENDING',
  Success = 'SUCCESS'
}

export type CustomPushUpdateInput = {
  body: Scalars['String']['input'];
  bundleList?: InputMaybe<Array<Scalars['String']['input']>>;
  entityID: Scalars['ID']['input'];
  entityType: PushEntityType;
  platformList?: InputMaybe<Array<PushPlatform>>;
  pushID: Scalars['String']['input'];
  scheduledAt?: InputMaybe<Scalars['String']['input']>;
  sportList?: InputMaybe<Array<Scalars['ID']['input']>>;
  subscriptionType: PushSubscriptionType;
  tagList?: InputMaybe<Array<Scalars['ID']['input']>>;
  title?: InputMaybe<Scalars['String']['input']>;
  tokens?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type CyberBettingWidgetInput = {
  bookmaker: BookmakerName;
  contentType?: InputMaybe<Scalars['String']['input']>;
  newsID: Scalars['ID']['input'];
};

export type CyberBettingWidgetTagInput = {
  /**  ID  */
  contentID: Scalars['String']['input'];
  /**  Тип виджета  */
  contentType?: InputMaybe<BettingWidgetContentType>;
  /**  ISO2 код страны  */
  iso2Country?: InputMaybe<Scalars['String']['input']>;
  /**  Имя плейсмента  */
  placementName: Scalars['String']['input'];
};

export enum CyberExpandTournaments {
  All = 'ALL',
  First10Series = 'FIRST10SERIES'
}

export enum CyberIdType {
  Abios = 'ABIOS',
  Cyber = 'CYBER',
  Hru = 'HRU',
  SportsTag = 'SPORTS_TAG'
}

export type CyberOkkoTournamentWidgetInput = {
  tournamentID: Scalars['ID']['input'];
};

export type CyberOtherClientArgs = {
  iso2Country?: InputMaybe<Scalars['String']['input']>;
  placement: Scalars['String']['input'];
};

export type CyberSearchArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  search: Scalars['String']['input'];
  sportType?: InputMaybe<SportsTypeFilter>;
};

export type CyberSeriesByDateFilter = {
  date?: InputMaybe<Scalars['String']['input']>;
  filters?: InputMaybe<Filters>;
  games?: InputMaybe<Array<CyberSportsType>>;
  timezone?: InputMaybe<Scalars['Int']['input']>;
  tournamentIDs?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export enum CyberSeriesByDateSort {
  AscStart = 'ASC_START',
  DescStart = 'DESC_START',
  Priority = 'PRIORITY'
}

export enum CyberSportsType {
  Cs = 'CS',
  Dota2 = 'DOTA2'
}

export type CyberStatArgs = {
  idType?: InputMaybe<CyberIdType>;
  ids: Array<Scalars['ID']['input']>;
};

export enum CyberStatEventStatus {
  Cancelled = 'CANCELLED',
  Ended = 'ENDED',
  Live = 'LIVE',
  NotStarted = 'NOT_STARTED',
  Postponed = 'POSTPONED',
  Unknown = 'UNKNOWN'
}

export enum CyberStatLastFileOutcome {
  Draw = 'DRAW',
  Lose = 'LOSE',
  Win = 'WIN'
}

export type CyberStatMatchCenterFilter = {
  filters?: InputMaybe<Filters>;
};

export enum CyberStatPickBanPhaseEvent {
  Ban = 'BAN',
  Pick = 'PICK'
}

export enum CyberStatPromotion {
  Advance = 'ADVANCE',
  Descend = 'DESCEND',
  Unknown = 'UNKNOWN'
}

export enum CyberStatSeriesState {
  Map1 = 'MAP1',
  Map2 = 'MAP2',
  Map3 = 'MAP3',
  Map4 = 'MAP4',
  Map5 = 'MAP5',
  None = 'NONE'
}

export enum CyberStatSeriesType {
  Bo1 = 'BO1',
  Bo2 = 'BO2',
  Bo3 = 'BO3',
  Bo5 = 'BO5'
}

export enum CyberSubstageType {
  DoubleElimination = 'DOUBLE_ELIMINATION',
  Group = 'GROUP',
  Gsl = 'GSL',
  SingleElimination = 'SINGLE_ELIMINATION'
}

export type CyberTournamentBettingWidgetInput = {
  bookmaker: BookmakerName;
  tournamentID: Scalars['ID']['input'];
};

export type DateFilter = {
  from: Scalars['Int']['input'];
  to: Scalars['Int']['input'];
};

export enum DealType {
  Campaign = 'CAMPAIGN',
  Donation = 'DONATION'
}

export enum DeleteCommentReason {
  /**  Коментарий удален самим пользователем  */
  ByUser = 'BY_USER',
  /**  Оскорбление  */
  Insult = 'INSULT',
  /**  Мульти-аккаунтинг  */
  MultiAccounting = 'MULTI_ACCOUNTING',
  /**  Прочее  */
  Other = 'OTHER',
  /**  Провокации  */
  Provocations = 'PROVOCATIONS',
  /**  Расизм  */
  Racism = 'RACISM',
  /**  Спам  */
  Spam = 'SPAM',
  /**  Мат, оскорбление  */
  Swears = 'SWEARS',
  /**  Систематический оффтом  */
  SystematicOfftop = 'SYSTEMATIC_OFFTOP',
  /**  Угрозы  */
  Threats = 'THREATS'
}

export type DeleteItemInput = {
  id: Scalars['ID']['input'];
};

export type DeleteQuestion = {
  id: Scalars['ID']['input'];
};

export type DeleteSection = {
  id: Scalars['ID']['input'];
};

export type DeleteStatPictureInput = {
  /**  Если расширение не указано, будут удалены картинки всех расширений  */
  extension?: InputMaybe<PictureExtension>;
  imageType?: InputMaybe<StatImageType>;
  objectID: Scalars['ID']['input'];
  objectType: StatImageObjectType;
};

export type DeleteUserPictureInput = {
  /**  Если расширение не указано, будут удалены картинки всех расширений  */
  extension?: InputMaybe<PictureExtension>;
  imageType: UserImageType;
  objectType: UserImageObjectType;
  /**
   * Для использование вместо id пользователя из контекста.
   * Требует админских прав.
   */
  userID?: InputMaybe<Scalars['ID']['input']>;
};

export type DocumentTagInput = {
  id: Scalars['ID']['input'];
  isMain: Scalars['Boolean']['input'];
};

export enum DotaRole {
  Carry = 'CARRY',
  Mid = 'MID',
  Offlane = 'OFFLANE',
  Support = 'SUPPORT',
  Unknown = 'UNKNOWN'
}

export type DotaSeriesInput = {
  leagueID: Scalars['ID']['input'];
  limit: Scalars['Int']['input'];
  page: Scalars['Int']['input'];
};

export enum DotaSide {
  Dire = 'DIRE',
  Radiant = 'RADIANT',
  Unknown = 'UNKNOWN'
}

export type EditBadgeInput = {
  autoSet: Scalars['Boolean']['input'];
  contentURL: Scalars['String']['input'];
  description: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  imageURL: Scalars['String']['input'];
  imageURLDark: Scalars['String']['input'];
  limit: Scalars['Int']['input'];
  name: Scalars['String']['input'];
  no_limit: Scalars['Boolean']['input'];
  status: BadgeStatus;
  tagID?: InputMaybe<Scalars['ID']['input']>;
};

export type EditItemInput = {
  active: Scalars['Boolean']['input'];
  allowedIn: Array<GeoPermissionCodes>;
  altText?: InputMaybe<Scalars['String']['input']>;
  blockedIn: Array<GeoPermissionCodes>;
  desktopOnly: Scalars['Boolean']['input'];
  externalLink: Scalars['Boolean']['input'];
  icon: Scalars['String']['input'];
  iconContent?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  newTab: Scalars['Boolean']['input'];
  parentID?: InputMaybe<Scalars['ID']['input']>;
  sectionID?: InputMaybe<Scalars['ID']['input']>;
  showInHamburger?: InputMaybe<Scalars['Boolean']['input']>;
  showInMain?: InputMaybe<Scalars['Boolean']['input']>;
  text: Scalars['String']['input'];
  titleAttr: Scalars['String']['input'];
  url: Scalars['String']['input'];
};

export type EditQuestion = {
  /**  Текст вопроса в формате SB  */
  answer: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  /**  Привязки к секциям  */
  sections?: InputMaybe<Array<FaqEditQuestionBindingsInput>>;
  /**  Статус (активен, скрыт, удален)  */
  status: FaqQuestionStatus;
  /**  Название вопроса  */
  title: Scalars['String']['input'];
};

export enum EditReviewErrorCode {
  TextTooLong = 'TEXT_TOO_LONG',
  Unauthorized = 'UNAUTHORIZED'
}

export type EditSection = {
  /**  SVG иконка для темной темы  */
  iconSvgDark: Scalars['String']['input'];
  /**  SVG иконка для светлой темы  */
  iconSvgLight: Scalars['String']['input'];
  /**  ID секции  */
  id: Scalars['ID']['input'];
  /**  Приоритет в списке  */
  priority: Scalars['Int']['input'];
  /**  Статус (активна, скрыта, удалена)  */
  status: FaqSectionStatus;
  /**  Название секции  */
  title: Scalars['String']['input'];
};

export enum EventObjectClass {
  Post = 'POST'
}

export enum FakePlayerStatus {
  None = 'NONE',
  Review = 'REVIEW',
  Translation = 'TRANSLATION'
}

export enum FantasyBenefitType {
  BenchBoost = 'BENCH_BOOST',
  TripleCaptain = 'TRIPLE_CAPTAIN',
  Wildcard = 'WILDCARD'
}

export type FantasyCreateLeagueInput = {
  name: Scalars['String']['input'];
  seasonID: Scalars['ID']['input'];
  type: FantasyLeagueType;
};

export type FantasyCreateSquadInput = {
  name: Scalars['String']['input'];
  seasonID: Scalars['ID']['input'];
};

export type FantasyDeleteLeagueInput = {
  id: Scalars['ID']['input'];
};

export enum FantasyIdSource {
  Hru = 'HRU',
  Id = 'ID'
}

export type FantasyLeagueSquadInput = {
  leagueID: Scalars['ID']['input'];
  squadID: Scalars['ID']['input'];
};

export enum FantasyLeagueType {
  Fan = 'FAN',
  General = 'GENERAL',
  Novice = 'NOVICE',
  Prize = 'PRIZE',
  Regional = 'REGIONAL',
  SecondChance = 'SECOND_CHANCE',
  User = 'USER'
}

export type FantasyLeaguesInput = {
  name?: InputMaybe<Scalars['String']['input']>;
  pageNum: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  seasonID: Scalars['ID']['input'];
  type?: InputMaybe<FantasyLeagueType>;
};

export type FantasyNewsInput = {
  /**  Дата ранее которой выводить новости (по умолчанию: текущее время)  */
  before?: InputMaybe<Scalars['Int']['input']>;
  /**  id либо webname турнира */
  id: Scalars['ID']['input'];
  /**  Количество новостей (по умолчанию: 6)  */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /**  Тип ID, ID или HRU (по умолчанию: HRU)  */
  source?: InputMaybe<FantasyIdSource>;
};

export type FantasyPaginationPlayersInput = {
  pageNum?: InputMaybe<Scalars['Int']['input']>;
  pageSize?: InputMaybe<Scalars['Int']['input']>;
  playerID?: InputMaybe<Scalars['ID']['input']>;
  priceFrom?: InputMaybe<Scalars['Float']['input']>;
  priceTo?: InputMaybe<Scalars['Float']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<FantasyPlayerRole>;
  sortOrder?: InputMaybe<FantasySortOrder>;
  sortType?: InputMaybe<FantasyPlayerSortType>;
  teamID?: InputMaybe<Scalars['ID']['input']>;
};

export type FantasyPaginationSeasonPlayerMatchesInput = {
  isFinished: Scalars['Boolean']['input'];
  pageNum: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  sortOrder: FantasySortOrder;
};

export type FantasyPlayerRatingInput = {
  /**  ID  выбранного типа сущности (тура либо сезона)  */
  entityID: Scalars['ID']['input'];
  entityType: FantasyRatingEntityType;
  pageNum: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  sortOrder: FantasySortOrder;
};

export enum FantasyPlayerRole {
  /**  Защитник  */
  Defender = 'DEFENDER',
  /**  Нападающий  */
  Forward = 'FORWARD',
  /**  Вратарь  */
  Goalkeeper = 'GOALKEEPER',
  /**  Полузащитник  */
  Midfielder = 'MIDFIELDER'
}

export enum FantasyPlayerSortType {
  /**  По передачам  */
  ByAssists = 'BY_ASSISTS',
  /**  По очкам за матч  */
  ByAveragePoints = 'BY_AVERAGE_POINTS',
  /**  По сухим матчам  */
  ByCleanSheets = 'BY_CLEAN_SHEETS',
  /**  По форме  */
  ByForm = 'BY_FORM',
  /**  По голам  */
  ByGoals = 'BY_GOALS',
  /**  По количеству матчей  */
  ByMatches = 'BY_MATCHES',
  /**  По сыгранным минутам  */
  ByMinutes = 'BY_MINUTES',
  /**  По имени  */
  ByName = 'BY_NAME',
  /**  По очкам  */
  ByPoints = 'BY_POINTS',
  /**  По популярности  */
  ByPopularity = 'BY_POPULARITY',
  /**  По цене  */
  ByPrice = 'BY_PRICE',
  /**  По сэйвам  */
  BySaves = 'BY_SAVES'
}

export enum FantasyPlayerStatus {
  /**  Дисквалифицирован  */
  Disqualification = 'DISQUALIFICATION',
  /**  Завершил карьеру  */
  EndedCareer = 'ENDED_CAREER',
  /**  Превышает клубный лимит  */
  ExceededClubLimit = 'EXCEEDED_CLUB_LIMIT',
  /**  Звёздный игрок  */
  Fiery = 'FIERY',
  /**  Травма  */
  Injury = 'INJURY',
  /**  Покинул турнир  */
  LeftTournament = 'LEFT_TOURNAMENT',
  /**  Недоступен  */
  Unavailable = 'UNAVAILABLE',
  /**  Статус не задан  */
  Unknown = 'UNKNOWN'
}

export type FantasyPlayersInput = {
  pageNum: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  priceFrom?: InputMaybe<Scalars['Float']['input']>;
  priceTo?: InputMaybe<Scalars['Float']['input']>;
  query?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<FantasyPlayerRole>;
  seasonID: Scalars['ID']['input'];
  sortOrder: FantasySortOrder;
  sortType: FantasyPlayerSortType;
  teamID?: InputMaybe<Scalars['ID']['input']>;
};

export enum FantasyRatingEntityType {
  Season = 'SEASON',
  Tour = 'TOUR'
}

export type FantasySeasonInput = {
  paginationPlayers?: InputMaybe<FantasyPaginationPlayersInput>;
  seasonID: Scalars['ID']['input'];
};

export enum FantasySortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type FantasySquadInput = {
  /**
   * Получить только команды для текущего пользователя
   * Если стоит userID, то этот параметр игнорируется.
   */
  currentUserOnly?: InputMaybe<Scalars['Boolean']['input']>;
  /**
   * Получить только команды в активных турнирах.
   * Команды будут отсортированы по дате создания
   */
  isActiveTournament?: InputMaybe<Scalars['Boolean']['input']>;
  /**  id сезона, либо webname турнира (тогда будет использован его активный сезон)  */
  seasonID?: InputMaybe<Scalars['ID']['input']>;
  squadID?: InputMaybe<Scalars['ID']['input']>;
  userID?: InputMaybe<Scalars['ID']['input']>;
};

export type FantasySquadLeaguesInput = {
  type?: InputMaybe<Array<FantasyLeagueType>>;
};

export type FantasySquadRatingInput = {
  /**  ID  выбранного типа сущности (тура либо сезона)  */
  entityID: Scalars['ID']['input'];
  entityType: FantasyRatingEntityType;
  leagueID?: InputMaybe<Scalars['ID']['input']>;
  pageNum: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  sortOrder: FantasySortOrder;
  squadID?: InputMaybe<Scalars['ID']['input']>;
};

export type FantasySquadTourInfoInput = {
  squadID: Scalars['ID']['input'];
  tourID: Scalars['ID']['input'];
};

export enum FantasyTourSortField {
  FinishedAt = 'FINISHED_AT',
  Id = 'ID',
  Name = 'NAME',
  StartedAt = 'STARTED_AT',
  TransfersFinishedAt = 'TRANSFERS_FINISHED_AT',
  TransfersStartedAt = 'TRANSFERS_STARTED_AT'
}

export enum FantasyTourStatus {
  /**  Матчи завершились, очки подсчитаны  */
  Finished = 'FINISHED',
  /**  Матчи идут, трансферы делать нельзя  */
  InProgress = 'IN_PROGRESS',
  /**  Матчей и регистрации нет  */
  NotStarted = 'NOT_STARTED',
  /**  Регистрация (возможность собрать состав) есть, матчи не начались  */
  Opened = 'OPENED'
}

export type FantasyTransferHistoryInput = {
  squadID: Scalars['ID']['input'];
};

export enum FantasyTransferType {
  Bought = 'BOUGHT',
  Sold = 'SOLD'
}

export type FantasyUpdateBenefitInput = {
  benefitType: FantasyBenefitType;
  isActive: Scalars['Boolean']['input'];
};

export type FantasyUpdatePlayerInput = {
  SubstitutePriority?: InputMaybe<Scalars['Int']['input']>;
  isCaptain?: InputMaybe<Scalars['Boolean']['input']>;
  isStarting?: InputMaybe<Scalars['Boolean']['input']>;
  isViceCaptain?: InputMaybe<Scalars['Boolean']['input']>;
  playerID: Scalars['ID']['input'];
};

export type FantasyUpdateSquadInput = {
  /**  Бонусы. Переданные бонусы можно активировать/деактивировать  */
  benefits?: InputMaybe<Array<FantasyUpdateBenefitInput>>;
  players: Array<FantasyUpdatePlayerInput>;
  /**  Использовать только id игроков и выбрать дефолтную расстановку  */
  playersOnly?: InputMaybe<Scalars['Boolean']['input']>;
  squadID: Scalars['ID']['input'];
};

export type FantasyUpdateTourInput = {
  /**  Время завершения  */
  finishedAt?: InputMaybe<Scalars['Time']['input']>;
  id: Scalars['ID']['input'];
  /**  Максимальное число игроков из одного клуба  */
  maxSameTeamPlayers?: InputMaybe<Scalars['Int']['input']>;
  /**  Имя  */
  name?: InputMaybe<Scalars['String']['input']>;
  /**  Время начала  */
  startedAt?: InputMaybe<Scalars['Time']['input']>;
  /**  Статус  */
  status?: InputMaybe<FantasyTourStatus>;
  /**  Количество трансферов  */
  totalTransfers?: InputMaybe<Scalars['Int']['input']>;
  /**  Время завершения трансферного окна  */
  transfersFinishedAt?: InputMaybe<Scalars['Time']['input']>;
  /**  Время начала трансферного окна  */
  transfersStartedAt?: InputMaybe<Scalars['Time']['input']>;
};

export type FaqEditQuestionBindingsInput = {
  priority?: InputMaybe<Scalars['Int']['input']>;
  sectionID: Scalars['ID']['input'];
};

export type FaqQuestionSectionInput = {
  priority: Scalars['Int']['input'];
  sectionID: Scalars['ID']['input'];
};

export enum FaqQuestionStatus {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  Hidden = 'HIDDEN'
}

export enum FaqSectionStatus {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  Hidden = 'HIDDEN'
}

export type Filters = {
  playerIDs?: InputMaybe<Array<Scalars['String']['input']>>;
  startTime?: InputMaybe<DateFilter>;
  teamIDs?: InputMaybe<Array<Scalars['String']['input']>>;
  teamRegions?: InputMaybe<Array<Scalars['String']['input']>>;
  tournamentIDs?: InputMaybe<Array<Scalars['String']['input']>>;
  tournamentIDsSource?: InputMaybe<CyberIdType>;
  tournamentRegions?: InputMaybe<Array<Scalars['String']['input']>>;
  tournamentTiers?: InputMaybe<Array<Scalars['Int']['input']>>;
};

export enum GeoPermissionCodes {
  Kz = 'KZ',
  Ru = 'RU'
}

export type HruAddInput = {
  /** Новое hru */
  name: Scalars['String']['input'];
  /** id тега */
  tagID: Scalars['Int']['input'];
};

export enum HubSport {
  Basketball = 'BASKETBALL',
  Football = 'FOOTBALL',
  Hockey = 'HOCKEY',
  Tennis = 'TENNIS'
}

export enum ImageType {
  Alternate = 'ALTERNATE',
  Avatar = 'AVATAR',
  Content = 'CONTENT',
  Main = 'MAIN',
  Stat = 'STAT',
  Svg = 'SVG'
}

export type ImageWithCropInput = {
  alt?: InputMaybe<Scalars['String']['input']>;
  cropCoordinates?: InputMaybe<CropCoordinatesInput>;
  croppedURL?: InputMaybe<Scalars['String']['input']>;
  originURL?: InputMaybe<Scalars['String']['input']>;
};

export enum IndexingListLocale {
  Cyber = 'CYBER',
  Sports = 'SPORTS'
}

export enum IndexingListOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum IndexingListSorting {
  GoogleSendTime = 'GOOGLE_SEND_TIME',
  GoogleVisitTime = 'GOOGLE_VISIT_TIME',
  Url = 'URL',
  YandexSendTime = 'YANDEX_SEND_TIME',
  YandexVisitTime = 'YANDEX_VISIT_TIME'
}

export type IndexingPageListInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  locale?: InputMaybe<IndexingListLocale>;
  order?: InputMaybe<IndexingListOrder>;
  page?: InputMaybe<Scalars['Int']['input']>;
  sorting?: InputMaybe<IndexingListSorting>;
  type?: InputMaybe<IndexingType>;
};

export enum IndexingType {
  Auto = 'AUTO',
  Manual = 'MANUAL'
}

export type InputChatMessage = {
  chatId: Scalars['ID']['input'];
  ctime?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  parentId?: InputMaybe<Scalars['ID']['input']>;
  text: Scalars['String']['input'];
};

export type MatchOfTheDayBettingWidgetInput = {
  bookmaker: BookmakerName;
  date: Scalars['String']['input'];
  sportType: BettingWidgetSportType;
};

export type MatchSnippetsMatchesInput = {
  date?: InputMaybe<Scalars['String']['input']>;
  roundID?: InputMaybe<Scalars['String']['input']>;
  sportID: Scalars['ID']['input'];
  tournamentID: Scalars['ID']['input'];
};

export type MatchTournamentBettingWidgetInput = {
  bookmaker: BookmakerName;
  interval?: InputMaybe<Scalars['Int']['input']>;
  tagIDs: Array<Scalars['ID']['input']>;
};

export enum MobilePlatform {
  Android = 'ANDROID',
  Ios = 'IOS'
}

export type MoveItemInput = {
  afterID?: InputMaybe<Scalars['ID']['input']>;
  id: Scalars['ID']['input'];
  parentID?: InputMaybe<Scalars['ID']['input']>;
};

export enum NewsAdminCreateErrorCode {
  ContentRequired = 'CONTENT_REQUIRED',
  DelayedActivationInPast = 'DELAYED_ACTIVATION_IN_PAST',
  DelayedDeactivationBefore = 'DELAYED_DEACTIVATION_BEFORE',
  DelayedDeactivationInPast = 'DELAYED_DEACTIVATION_IN_PAST',
  ImageFormatUnsupported = 'IMAGE_FORMAT_UNSUPPORTED',
  ImageHostNotAllowed = 'IMAGE_HOST_NOT_ALLOWED',
  ImageUrlInvalid = 'IMAGE_URL_INVALID',
  InvalidSb = 'INVALID_SB',
  InvalidSourceScheme = 'INVALID_SOURCE_SCHEME',
  InvalidSourceUrl = 'INVALID_SOURCE_URL',
  MainSectionInvalid = 'MAIN_SECTION_INVALID',
  MainSectionRequired = 'MAIN_SECTION_REQUIRED',
  RedirectNewsNotFound = 'REDIRECT_NEWS_NOT_FOUND'
}

export type NewsAdminListInput = {
  amount: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  sectionID?: InputMaybe<Scalars['ID']['input']>;
  timeFrom?: InputMaybe<Scalars['String']['input']>;
  timeTo?: InputMaybe<Scalars['String']['input']>;
};

export type NewsAdminSearchInput = {
  amount: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  q: Scalars['String']['input'];
  sectionID?: InputMaybe<Scalars['ID']['input']>;
  timeFrom?: InputMaybe<Scalars['String']['input']>;
  timeTo?: InputMaybe<Scalars['String']['input']>;
};

export enum NewsAdminUpdateErrorCode {
  ContentRequired = 'CONTENT_REQUIRED',
  DelayedActivationInPast = 'DELAYED_ACTIVATION_IN_PAST',
  DelayedDeactivationBefore = 'DELAYED_DEACTIVATION_BEFORE',
  DelayedDeactivationInPast = 'DELAYED_DEACTIVATION_IN_PAST',
  ImageFormatUnsupported = 'IMAGE_FORMAT_UNSUPPORTED',
  ImageHostNotAllowed = 'IMAGE_HOST_NOT_ALLOWED',
  ImageUrlInvalid = 'IMAGE_URL_INVALID',
  InvalidSb = 'INVALID_SB',
  InvalidSourceScheme = 'INVALID_SOURCE_SCHEME',
  InvalidSourceUrl = 'INVALID_SOURCE_URL',
  MainSectionInvalid = 'MAIN_SECTION_INVALID',
  MainSectionRequired = 'MAIN_SECTION_REQUIRED',
  RedirectNewsNotFound = 'REDIRECT_NEWS_NOT_FOUND'
}

export enum NewsBreakingPushErrorCode {
  PushAlreadySent = 'PUSH_ALREADY_SENT',
  PushInfoRequired = 'PUSH_INFO_REQUIRED',
  SportOrTagsRequired = 'SPORT_OR_TAGS_REQUIRED',
  TagsRequired = 'TAGS_REQUIRED',
  TimeInPast = 'TIME_IN_PAST'
}

export type NewsByIdInput = {
  id: Scalars['ID']['input'];
};

/** Типы новостных фильтров */
export enum NewsFilterType {
  All = 'ALL',
  Main = 'MAIN',
  Personal = 'PERSONAL',
  Section = 'SECTION'
}

export enum NewsStatus {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  Hidden = 'HIDDEN'
}

export enum NotificationFilter {
  All = 'ALL',
  Mails = 'MAILS',
  Notifications = 'NOTIFICATIONS'
}

/** Типы плейсментов */
export enum OddsPlacement {
  /** Текущий турнир */
  CurrentTournament = 'CURRENT_TOURNAMENT',
  /** Матч дня для Кибера */
  CyberMatchday = 'CYBER_MATCHDAY',
  /** матчцентр для cs */
  CyberMatchCenterCsgo = 'CYBER_MATCH_CENTER_CSGO',
  /** матчцентр для доты */
  CyberMatchCenterDota = 'CYBER_MATCH_CENTER_DOTA',
  /** виджет команд */
  CyberTeamTag = 'CYBER_TEAM_TAG',
  /** тизер для cs */
  CyberTeaserCsgo = 'CYBER_TEASER_CSGO',
  /** тизер для доты */
  CyberTeaserDota = 'CYBER_TEASER_DOTA',
  /** виджет турниров */
  CyberTournamentTag = 'CYBER_TOURNAMENT_TAG',
  /** опросы в csgo */
  CyberVotingCsgo = 'CYBER_VOTING_CSGO',
  /** опросы в доте */
  CyberVotingDota = 'CYBER_VOTING_DOTA',
  /** Фактоиды */
  FactoidsMainpage = 'FACTOIDS_MAINPAGE',
  /** Фактоиды в онлайне матча */
  FactoidsOnlineMatch = 'FACTOIDS_ONLINE_MATCH',
  /** Матчи для fantasy */
  FantasyMatch = 'FANTASY_MATCH',
  /** Коэффициенты в Фэнтези Бундеслиги */
  FantasyMatchBundes = 'FANTASY_MATCH_BUNDES',
  /** Коэффициенты в Фэнтези Чемпионшип */
  FantasyMatchChampionship = 'FANTASY_MATCH_CHAMPIONSHIP',
  /** Коэффициенты в Фэнтези АПЛ */
  FantasyMatchEpl = 'FANTASY_MATCH_EPL',
  /** Коэффициенты в Фэнтези Ла Лига */
  FantasyMatchLaLiga = 'FANTASY_MATCH_LA_LIGA',
  /** Коэффициенты в Фэнтези Лиги 1 */
  FantasyMatchLigue_1 = 'FANTASY_MATCH_LIGUE_1',
  /** Коэффициенты в Фэнтези Нидерландов */
  FantasyMatchNetherlands = 'FANTASY_MATCH_NETHERLANDS',
  /** Матчи для fantasy без спонсоров */
  FantasyMatchNoSponsor = 'FANTASY_MATCH_NO_SPONSOR',
  /** Коэффициенты в Фэнтези Португалии */
  FantasyMatchPortugal = 'FANTASY_MATCH_PORTUGAL',
  /** Коэффициенты в Фэнтези РПЛ */
  FantasyMatchRpl = 'FANTASY_MATCH_RPL',
  /** Коэффициенты в Фэнтези Серии А */
  FantasyMatchSerieA = 'FANTASY_MATCH_SERIE_A',
  /** Коэффициенты в Фэнтези Турции */
  FantasyMatchTurkey = 'FANTASY_MATCH_TURKEY',
  /** Коэффициенты в Фэнтези Лиги Чемпионов */
  FantasyMatchUcl = 'FANTASY_MATCH_UCL',
  /** Коэффициенты в Фэнтези Лиги Европы */
  FantasyMatchUel = 'FANTASY_MATCH_UEL',
  /** Коэффициенты в Фэнтези ЧМ 2022 */
  FantasyMatchWorldCup = 'FANTASY_MATCH_WORLD_CUP',
  /** Матч-центр мобильного приложения */
  MobileMatchCenter = 'MOBILE_MATCH_CENTER',
  /** Текущий матч / Онлайн */
  OnlineMatch = 'ONLINE_MATCH',
  /** тип для кастомных форматов */
  SpecialUrl = 'SPECIAL_URL',
  /** Чемпионат мира 2022 Катар */
  WorldCup = 'WORLD_CUP',
  /** Чемпионат мира 2022 Катар - 2 тип */
  WorldCupOdds = 'WORLD_CUP_ODDS',
  /** Коэффициенты в предиктор ЧМ 2022 */
  WorldCupPredict = 'WORLD_CUP_PREDICT'
}

export enum OddsWidgetView {
  Odds_1X2View = 'ODDS_1X2_VIEW',
  OddsBothToScoreView = 'ODDS_BOTH_TO_SCORE_VIEW',
  OddsDoubleChanceView = 'ODDS_DOUBLE_CHANCE_VIEW',
  OddsHandicapView = 'ODDS_HANDICAP_VIEW',
  OddsIndividualTotalAwayView = 'ODDS_INDIVIDUAL_TOTAL_AWAY_VIEW',
  OddsIndividualTotalHomeView = 'ODDS_INDIVIDUAL_TOTAL_HOME_VIEW',
  OddsTotalView = 'ODDS_TOTAL_VIEW'
}

export type OkkoArgs = {
  iso2Country?: InputMaybe<Scalars['String']['input']>;
  placement: Scalars['String']['input'];
};

export type OmniAthletesFilter = {
  countryCode?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<WinterOlympicPersonGender>;
  hasMedal?: InputMaybe<Scalars['Boolean']['input']>;
  sportId?: InputMaybe<Scalars['ID']['input']>;
};

export type OmniAthletesPagination = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export enum OmniOlympicEventStatus {
  Closed = 'CLOSED',
  Live = 'LIVE',
  NotStarted = 'NOT_STARTED'
}

export enum OmniOlympicFilterMedalType {
  BronzeFilterMedalType = 'BRONZE_FILTER_MEDAL_TYPE',
  GoldFilterMedalType = 'GOLD_FILTER_MEDAL_TYPE',
  MedalsFilterMedalType = 'MEDALS_FILTER_MEDAL_TYPE'
}

export type OmniOlympicGameInput = {
  id: Scalars['ID']['input'];
};

export enum OmniOlympicMedalStatus {
  Medals = 'MEDALS',
  NoCompetition = 'NO_COMPETITION',
  NoMedals = 'NO_MEDALS'
}

export enum OmniOlympicMedalType {
  Bronze = 'BRONZE',
  Gold = 'GOLD',
  Silver = 'SILVER',
  UndefinedMedalType = 'UNDEFINED_MEDAL_TYPE'
}

export enum OmniOlympicParticipantType {
  Person = 'PERSON',
  Team = 'TEAM',
  UndefinedParticipantType = 'UNDEFINED_PARTICIPANT_TYPE'
}

export enum OmniOlympicPersonGender {
  Female = 'FEMALE',
  Male = 'MALE'
}

export type OmniOlympicPictureLogoInput = {
  ext?: PictureExtension;
  resize?: PictureLogoSize;
};

export type OmniOlympicRussianTeamFilter = {
  gender?: InputMaybe<OmniOlympicPersonGender>;
  sportId?: InputMaybe<Scalars['ID']['input']>;
};

export type OmniOlympicRussianTeamPagination = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type OmniOlympicTopByMedalsArgs = {
  limit: Scalars['Int']['input'];
};

export type OmniOlympicsFiveEventsInput = {
  dateTime?: InputMaybe<Scalars['String']['input']>;
  typeEvent: OmniOlympicsFiveEventsType;
};

export enum OmniOlympicsFiveEventsType {
  LastFive = 'LAST_FIVE',
  NextFive = 'NEXT_FIVE'
}

export enum OmniOlympicsMedalType {
  Bronze = 'BRONZE',
  Gold = 'GOLD',
  None = 'NONE',
  Silver = 'SILVER'
}

export enum OrderStatus {
  Authorized = 'AUTHORIZED',
  Checked = 'CHECKED',
  Completed = 'COMPLETED',
  Confirmed = 'CONFIRMED',
  Expired = 'EXPIRED',
  New = 'NEW',
  PartialRefunded = 'PARTIAL_REFUNDED',
  PartialReversed = 'PARTIAL_REVERSED',
  Refunded = 'REFUNDED',
  Rejected = 'REJECTED',
  Reversed = 'REVERSED',
  Uninitialized = 'UNINITIALIZED'
}

export enum PersonalFeedCauseType {
  Blog = 'BLOG',
  Friend = 'FRIEND',
  Tag = 'TAG'
}

export enum PersonalFeedSubscriptionType {
  Blog = 'BLOG',
  User = 'USER'
}

export enum PictureCountryLogoSize {
  Original = 'ORIGINAL',
  Size_16_16 = 'SIZE_16_16',
  Size_32_24 = 'SIZE_32_24',
  Size_32_32 = 'SIZE_32_32',
  Size_64_48 = 'SIZE_64_48',
  Size_64_64 = 'SIZE_64_64',
  Size_128_128 = 'SIZE_128_128',
  Size_160_120 = 'SIZE_160_120',
  Size_320_240 = 'SIZE_320_240'
}

export type PictureCreateBlog = {
  ext?: PictureExtension;
  resize?: PictureCreateBlogSize;
  scale?: InputMaybe<Scalars['Int']['input']>;
};

export enum PictureCreateBlogSize {
  Original = 'ORIGINAL',
  Width_256 = 'WIDTH_256',
  Width_512 = 'WIDTH_512'
}

export enum PictureExtension {
  Avif = 'AVIF',
  Gif = 'GIF',
  Jpeg = 'JPEG',
  Png = 'PNG',
  Svg = 'SVG',
  Webp = 'WEBP'
}

export type PictureInputLogoCountry = {
  ext?: InputMaybe<PictureExtension>;
  multi?: InputMaybe<PictureLogoRetinaMultiplier>;
  resize?: InputMaybe<PictureCountryLogoSize>;
};

export type PictureInputLogoPlayer = {
  ext?: InputMaybe<PictureExtension>;
  multi?: InputMaybe<PictureLogoRetinaMultiplier>;
  resize?: InputMaybe<PictureLogoSize>;
};

export type PictureInputLogoTeam = {
  ext?: InputMaybe<PictureExtension>;
  multi?: InputMaybe<PictureLogoRetinaMultiplier>;
  resize?: InputMaybe<PictureLogoSize>;
};

export type PictureInputLogoTournament = {
  ext?: InputMaybe<PictureExtension>;
  multi?: InputMaybe<PictureLogoRetinaMultiplier>;
  resize?: InputMaybe<PictureLogoSize>;
};

export type PictureInputLogoVenue = {
  ext?: InputMaybe<PictureExtension>;
  multi?: InputMaybe<PictureLogoRetinaMultiplier>;
  resize?: InputMaybe<PictureLogoSize>;
};

export type PictureInputUserAvatar = {
  ext?: PictureExtension;
  resize?: PictureUserAvatarSize;
  scale?: InputMaybe<Scalars['Int']['input']>;
};

export enum PictureLogoRetinaMultiplier {
  X1 = 'X1',
  X2 = 'X2',
  X3 = 'X3',
  X4 = 'X4'
}

export enum PictureLogoSize {
  Original = 'ORIGINAL',
  Size_16_16 = 'SIZE_16_16',
  Size_32_32 = 'SIZE_32_32',
  Size_64_64 = 'SIZE_64_64',
  Size_128_128 = 'SIZE_128_128',
  Size_172_172 = 'SIZE_172_172',
  Size_200_200 = 'SIZE_200_200',
  Size_256_256 = 'SIZE_256_256',
  Size_1280_720 = 'SIZE_1280_720',
  Size_1920_1080 = 'SIZE_1920_1080'
}

export type PictureNews = {
  ext?: PictureExtension;
  resize?: PictureNewsSize;
};

export enum PictureNewsSize {
  Original = 'ORIGINAL',
  Width_64 = 'WIDTH_64',
  Width_128 = 'WIDTH_128',
  Width_256 = 'WIDTH_256',
  Width_320 = 'WIDTH_320',
  Width_640 = 'WIDTH_640',
  Width_730 = 'WIDTH_730'
}

export type PicturePost = {
  ext?: PictureExtension;
  resize?: PicturePostSize;
  scale?: InputMaybe<Scalars['Int']['input']>;
};

export enum PicturePostSize {
  Original = 'ORIGINAL',
  Width_320 = 'WIDTH_320',
  Width_640 = 'WIDTH_640',
  Width_730 = 'WIDTH_730'
}

export type PictureStructuredBody = {
  ext?: PictureExtension;
  keepSmall?: InputMaybe<Scalars['Boolean']['input']>;
  resize?: PictureStructuredBodySize;
  scale?: InputMaybe<Scalars['Int']['input']>;
};

export enum PictureStructuredBodySize {
  Original = 'ORIGINAL',
  Width_730 = 'WIDTH_730'
}

export enum PictureUserAvatarSize {
  Original = 'ORIGINAL',
  Size_16_16 = 'SIZE_16_16',
  Size_32_32 = 'SIZE_32_32',
  Size_48_48 = 'SIZE_48_48',
  Size_64_64 = 'SIZE_64_64',
  Size_128_128 = 'SIZE_128_128'
}

export enum Position {
  Defender = 'DEFENDER',
  Forward = 'FORWARD',
  Goalkeeper = 'GOALKEEPER',
  Manager = 'MANAGER',
  Midfielder = 'MIDFIELDER',
  None = 'NONE'
}

export enum PostCreateErrorCode {
  BriefMediaHostNotAllowed = 'BRIEF_MEDIA_HOST_NOT_ALLOWED',
  BriefMediaInvalidUrlPattern = 'BRIEF_MEDIA_INVALID_URL_PATTERN',
  CreatePostLimitReached = 'CREATE_POST_LIMIT_REACHED',
  EmptyMainSection = 'EMPTY_MAIN_SECTION',
  EmptyTitle = 'EMPTY_TITLE',
  InvalidMainSection = 'INVALID_MAIN_SECTION',
  InvalidSb = 'INVALID_SB',
  InvalidTitle = 'INVALID_TITLE',
  NotPermittedSubsection = 'NOT_PERMITTED_SUBSECTION',
  PermissionDenied = 'PERMISSION_DENIED',
  UnknownMainSection = 'UNKNOWN_MAIN_SECTION',
  UnknownSubsection = 'UNKNOWN_SUBSECTION',
  UnknownTag = 'UNKNOWN_TAG'
}

export type PostCreateInput = {
  /** ID блога */
  blogID?: InputMaybe<Scalars['ID']['input']>;
  /** брендированный ли */
  branded?: InputMaybe<Scalars['Boolean']['input']>;
  /** анонс */
  brief: Scalars['String']['input'];
  /** медия ссылка в анонсе */
  briefMediaURL: Scalars['String']['input'];
  /** отключены ли комментарии */
  commentsDisabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** положение оглавления */
  contentsPosition?: InputMaybe<Scalars['Int']['input']>;
  /** создавать ли материал */
  createArticle?: InputMaybe<Scalars['Boolean']['input']>;
  /** убран ли из рекомандаций */
  disabledSuggestions?: InputMaybe<Scalars['Boolean']['input']>;
  /** источник/редактор */
  editSource?: InputMaybe<EditSource>;
  /** скрыт ли из разделов */
  hideFromSections?: InputMaybe<Scalars['Boolean']['input']>;
  /** рейтинговать или нет */
  rateOff: Scalars['Boolean']['input'];
  /** ID секции */
  sectionID: Scalars['ID']['input'];
  /** статус */
  status: PostStatus;
  /** контент поста (в формате sb) */
  structuredBody: Scalars['String']['input'];
  /** список ID подсекций */
  subsectionIDs?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** список ID тегов */
  tagIDs?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** заголовок */
  title: Scalars['String']['input'];
};

export enum PostDeleteErrorCode {
  PermissionDenied = 'PERMISSION_DENIED'
}

export enum PostEditErrorCode {
  BriefMediaHostNotAllowed = 'BRIEF_MEDIA_HOST_NOT_ALLOWED',
  BriefMediaInvalidUrlPattern = 'BRIEF_MEDIA_INVALID_URL_PATTERN',
  EmptyMainSection = 'EMPTY_MAIN_SECTION',
  EmptyTitle = 'EMPTY_TITLE',
  InvalidMainSection = 'INVALID_MAIN_SECTION',
  InvalidSb = 'INVALID_SB',
  InvalidTitle = 'INVALID_TITLE',
  NotPermittedSubsection = 'NOT_PERMITTED_SUBSECTION',
  PermissionDenied = 'PERMISSION_DENIED',
  UnknownMainSection = 'UNKNOWN_MAIN_SECTION',
  UnknownSubsection = 'UNKNOWN_SUBSECTION',
  UnknownTag = 'UNKNOWN_TAG'
}

export type PostEditInput = {
  /** брендированный ли */
  branded?: InputMaybe<Scalars['Boolean']['input']>;
  /** анонс */
  brief: Scalars['String']['input'];
  /** медия ссылка в анонсе */
  briefMediaURL: Scalars['String']['input'];
  /** отключены ли комментарии */
  commentsDisabled?: InputMaybe<Scalars['Boolean']['input']>;
  /** положение оглавления */
  contentsPosition?: InputMaybe<Scalars['Int']['input']>;
  /** создавать ли материал */
  createArticle?: InputMaybe<Scalars['Boolean']['input']>;
  /** убран ли из рекомандаций */
  disabledSuggestions?: InputMaybe<Scalars['Boolean']['input']>;
  /** источник/редактор */
  editSource?: InputMaybe<EditSource>;
  /** скрыт ли из разделов */
  hideFromSections?: InputMaybe<Scalars['Boolean']['input']>;
  /** ID поста */
  postID: Scalars['ID']['input'];
  /** рейтинговать или нет */
  rateOff: Scalars['Boolean']['input'];
  /** ID секции */
  sectionID: Scalars['ID']['input'];
  /** статус */
  status: PostStatus;
  /** контент поста (в формате sb) */
  structuredBody: Scalars['String']['input'];
  /** список ID подсекций */
  subsectionIDs?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** список ID тегов */
  tagIDs?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** заголовок */
  title: Scalars['String']['input'];
};

export enum PostSource {
  Author = 'AUTHOR',
  Blog = 'BLOG'
}

export enum PostStatus {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  Draft = 'DRAFT',
  Hidden = 'HIDDEN',
  PublishedDraft = 'PUBLISHED_DRAFT'
}

export enum PostUpdateAuthorErrorCode {
  EmptyAuthor = 'EMPTY_AUTHOR'
}

export type PredictionHubCreatePredictionInput = {
  /** Идентификатор матча */
  matchID: Scalars['ID']['input'];
  /** Кэф */
  oddsFloat?: InputMaybe<Scalars['Float']['input']>;
  /** Идентификатор поста */
  postID: Scalars['ID']['input'];
  /** Вид спорта */
  sportType: PredictionHubSportType;
};

export type PredictionHubDeletePredictionInput = {
  /** Идентификатор прогноза */
  id: Scalars['ID']['input'];
};

export enum PredictionHubPredictionFilter {
  All = 'ALL',
  Tomorrow = 'TOMORROW'
}

export enum PredictionHubSportType {
  Basketball = 'BASKETBALL',
  Football = 'FOOTBALL',
  Hockey = 'HOCKEY',
  Tennis = 'TENNIS'
}

export type PredictionHubUpdatePredictionInput = {
  /** Идентификатор прогноза */
  id: Scalars['ID']['input'];
  odds?: InputMaybe<Scalars['Float']['input']>;
};

export enum PreferenceType {
  CancelDislike = 'CANCEL_DISLIKE',
  CancelSeen = 'CANCEL_SEEN',
  Dislike = 'DISLIKE',
  Seen = 'SEEN'
}

export enum PushEntityType {
  Match = 'MATCH',
  News = 'NEWS',
  Post = 'POST',
  Status = 'STATUS'
}

export enum PushLanguage {
  En = 'EN',
  Ru = 'RU'
}

export enum PushPlatform {
  Android = 'ANDROID',
  Ios = 'IOS',
  Web = 'WEB'
}

export enum PushSubscriptionType {
  BreakingNews = 'BREAKING_NEWS',
  FavSports = 'FAV_SPORTS',
  FavTags = 'FAV_TAGS'
}

export type PusherAddTokenInput = {
  bundleId: Scalars['String']['input'];
  lang?: InputMaybe<PushLanguage>;
  platform: PushPlatform;
  status?: InputMaybe<PushesStatus>;
  token?: InputMaybe<Scalars['String']['input']>;
};

export type PusherEventSubscribeInput = {
  events: Array<PusherEventType>;
};

export enum PusherEventType {
  BasketballBeforeMatchStart = 'BASKETBALL_BEFORE_MATCH_START',
  BasketballMatchEnd = 'BASKETBALL_MATCH_END',
  BasketballMatchStart = 'BASKETBALL_MATCH_START',
  BasketballPeriodStart = 'BASKETBALL_PERIOD_START',
  BreakingNews = 'BREAKING_NEWS',
  CommentReply = 'COMMENT_REPLY',
  CommentStatus = 'COMMENT_STATUS',
  EndBets = 'END_BETS',
  EndRound = 'END_ROUND',
  FavSections = 'FAV_SECTIONS',
  FavTags = 'FAV_TAGS',
  FootballBeforeMatchStart = 'FOOTBALL_BEFORE_MATCH_START',
  FootballBreak = 'FOOTBALL_BREAK',
  FootballGoal = 'FOOTBALL_GOAL',
  FootballMatchEnd = 'FOOTBALL_MATCH_END',
  FootballMatchStart = 'FOOTBALL_MATCH_START',
  FootballPenalty = 'FOOTBALL_PENALTY',
  FootballPeriodStart = 'FOOTBALL_PERIOD_START',
  FootballRedCard = 'FOOTBALL_RED_CARD',
  FootballSubstitution = 'FOOTBALL_SUBSTITUTION',
  FootballTeamPlayer = 'FOOTBALL_TEAM_PLAYER',
  FootballVar = 'FOOTBALL_VAR',
  FootballVideo = 'FOOTBALL_VIDEO',
  FootballYellowCard = 'FOOTBALL_YELLOW_CARD',
  HockeyBeforeMatchStart = 'HOCKEY_BEFORE_MATCH_START',
  HockeyBreak = 'HOCKEY_BREAK',
  HockeyGoal = 'HOCKEY_GOAL',
  HockeyMatchEnd = 'HOCKEY_MATCH_END',
  HockeyMatchStart = 'HOCKEY_MATCH_START',
  HockeyPeriodStart = 'HOCKEY_PERIOD_START',
  Medals = 'MEDALS',
  NewBets = 'NEW_BETS',
  ResultRound = 'RESULT_ROUND',
  StartBets = 'START_BETS',
  StartRound = 'START_ROUND',
  TournamentMatch = 'TOURNAMENT_MATCH'
}

export type PusherEventUnsubscribeInput = {
  events: Array<PusherEventType>;
};

export type PusherSectionSubscribeInput = {
  sectionIDs: Array<Scalars['ID']['input']>;
};

export type PusherSectionUnsubscribeInput = {
  sectionIDs: Array<Scalars['ID']['input']>;
};

export type PusherUpdateTokenInput = {
  newToken: Scalars['String']['input'];
};

export enum PushesStatus {
  Active = 'ACTIVE',
  Disabled = 'DISABLED'
}

export enum RateNotAllowedErrorCode {
  ActionIncorrect = 'ACTION_INCORRECT',
  AlreadyRatedComment = 'ALREADY_RATED_COMMENT',
  AlreadyRatedNews = 'ALREADY_RATED_NEWS',
  AlreadyRatedPost = 'ALREADY_RATED_POST',
  BadObjectId = 'BAD_OBJECT_ID',
  Banned = 'BANNED',
  CommentNotActive = 'COMMENT_NOT_ACTIVE',
  EmailNotConfirmed = 'EMAIL_NOT_CONFIRMED',
  Forbidden = 'FORBIDDEN',
  ObjectIncorrect = 'OBJECT_INCORRECT',
  OldComment = 'OLD_COMMENT',
  OldPost = 'OLD_POST',
  PostNotActive = 'POST_NOT_ACTIVE',
  PostRateOff = 'POST_RATE_OFF',
  RegistrationAfterPost = 'REGISTRATION_AFTER_POST',
  SelfRate = 'SELF_RATE',
  TargetTimeInThePast = 'TARGET_TIME_IN_THE_PAST',
  Unauthorized = 'UNAUTHORIZED',
  UserCantMinus = 'USER_CANT_MINUS',
  UserDisqualified = 'USER_DISQUALIFIED',
  UserLimitDailyEnd = 'USER_LIMIT_DAILY_END',
  UserLimitMinusEnd = 'USER_LIMIT_MINUS_END',
  UserLimitMinusSectionEnd = 'USER_LIMIT_MINUS_SECTION_END',
  UserLimitMinusTagEnd = 'USER_LIMIT_MINUS_TAG_END',
  WrongDateFormat = 'WRONG_DATE_FORMAT'
}

export type RecommendationDoc = {
  documentID: Scalars['ID']['input'];
  documentType: RecommendationDocumentType;
};

export enum RecommendationDocumentType {
  News = 'NEWS',
  Post = 'POST'
}

export enum RecommendationIgnoreType {
  Author = 'AUTHOR',
  Blog = 'BLOG',
  Section = 'SECTION',
  Tag = 'TAG'
}

export enum SearchEngine {
  All = 'ALL',
  Google = 'GOOGLE',
  Yandex = 'YANDEX'
}

export type SeasonMatchesInput = {
  seasonId?: InputMaybe<Scalars['ID']['input']>;
};

export type SeasonToursInput = {
  /**  id сезона */
  id: Scalars['ID']['input'];
  /**  Поле сортировки (по умолчанию: ID)  */
  sortField?: InputMaybe<FantasyTourSortField>;
  /**  Направление сортировки (по умолчанию: DESC)  */
  sortOrder?: InputMaybe<FantasySortOrder>;
};

export type SectionsInfo = {
  mainSectionID: Scalars['ID']['input'];
  sectionIDs: Array<Scalars['ID']['input']>;
};

export type SendBreakingPushInput = {
  breakingPush: BreakingPushInput;
  newsID: Scalars['ID']['input'];
};

export type SendNowDeferredPushInput = {
  pushID: Scalars['ID']['input'];
};

export type SeriesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<CyberSeriesByDateSort>;
};

export type SeriesBySportTypeArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  sportsType?: InputMaybe<Array<CyberSportsType>>;
};

export type SeriesByStatusArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<CyberSeriesByDateSort>;
  status: CyberStatEventStatus;
};

export enum SeriesOutcome {
  Draw = 'DRAW',
  Team1Win = 'TEAM1WIN',
  Team2Win = 'TEAM2WIN'
}

export type SetAnimatedLogoInput = {
  animation: Animation;
};

export type SetLogoContentInput = {
  content: Scalars['String']['input'];
};

export type SetLogoUrlInput = {
  url: Scalars['String']['input'];
};

export type SetPreferenceInput = {
  documentID: Scalars['ID']['input'];
  documentType: RecommendationDocumentType;
  preference: PreferenceType;
};

export type SetRulesInput = {
  rules: Array<UserRule>;
  userID: Scalars['ID']['input'];
};

export type SetUserInterestInput = {
  docs: Array<RecommendationDoc>;
};

export type ShortsSlideInput = {
  id: Scalars['ID']['input'];
  imageWithCrop: ImageWithCropInput;
  text?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type ShortsStoryInput = {
  audioIsMuted?: InputMaybe<Scalars['Boolean']['input']>;
  audioURL?: InputMaybe<Scalars['String']['input']>;
  documentID: Scalars['ID']['input'];
  documentType: SummaryDocumentType;
  id: Scalars['ID']['input'];
  slides?: InputMaybe<Array<ShortsSlideInput>>;
};

export type ShortsStoryUpdate = {
  story: ShortsStoryInput;
};

export type SimilarInput = {
  ID: Scalars['ID']['input'];
  documentType: RecommendationDocumentType;
  limit: Scalars['Int']['input'];
};

export type SimplePushInput = {
  text: Scalars['String']['input'];
  title?: InputMaybe<Scalars['String']['input']>;
  token: Scalars['String']['input'];
};

export enum SocialClass {
  Dzen = 'DZEN',
  Rss = 'RSS',
  Telegram = 'TELEGRAM',
  Twitter = 'TWITTER',
  Vk = 'VK'
}

export type SocialLoginAuthByTelegramInput = {
  hash: Scalars['String']['input'];
  userInfo: SocialLoginTelegramUserInfoInput;
};

export enum SocialLoginErrorCode {
  AuthCodeExpired = 'AUTH_CODE_EXPIRED',
  PhoneNotConfirmed = 'PHONE_NOT_CONFIRMED',
  UserBanned = 'USER_BANNED',
  UserBlocked = 'USER_BLOCKED',
  UserNotActivated = 'USER_NOT_ACTIVATED'
}

export enum SocialLoginObjectType {
  BanObjectTypeBookmakerOpinion = 'BAN_OBJECT_TYPE_BOOKMAKER_OPINION',
  BanObjectTypeComment = 'BAN_OBJECT_TYPE_COMMENT',
  BanObjectTypeNoObject = 'BAN_OBJECT_TYPE_NO_OBJECT',
  BanObjectTypePost = 'BAN_OBJECT_TYPE_POST'
}

export type SocialLoginTelegramUserInfoInput = {
  authDate: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  photoUrl?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type SplitByTournamentsInput = {
  seriesCount?: InputMaybe<Scalars['Int']['input']>;
  tournamentCount?: InputMaybe<Scalars['Int']['input']>;
};

export enum SportsTypeFilter {
  All = 'ALL',
  Cs = 'CS',
  Dota2 = 'DOTA2'
}

export enum StatImageNamespaceType {
  Country = 'COUNTRY',
  CyberHero = 'CYBER_HERO',
  CyberItem = 'CYBER_ITEM',
  CyberPlayer = 'CYBER_PLAYER',
  CyberTeam = 'CYBER_TEAM',
  CyberTournament = 'CYBER_TOURNAMENT',
  Dump = 'DUMP',
  FantasyKit = 'FANTASY_KIT',
  Placeholder = 'PLACEHOLDER',
  Player = 'PLAYER',
  Sport = 'SPORT',
  Team = 'TEAM',
  Tournament = 'TOURNAMENT',
  UserAvatar = 'USER_AVATAR'
}

export enum StatImageObjectType {
  Country = 'COUNTRY',
  HockeyCountry = 'HOCKEY_COUNTRY',
  HockeyPlayer = 'HOCKEY_PLAYER',
  HockeyTeam = 'HOCKEY_TEAM',
  HockeyTournament = 'HOCKEY_TOURNAMENT',
  Player = 'PLAYER',
  Team = 'TEAM',
  TennisCompetition = 'TENNIS_COMPETITION',
  TennisPerson = 'TENNIS_PERSON',
  Tournament = 'TOURNAMENT'
}

export enum StatImageType {
  Alternate = 'ALTERNATE',
  Avatar = 'AVATAR',
  Main = 'MAIN',
  Svg = 'SVG'
}

export type StreamInput = {
  name: Scalars['String']['input'];
  source?: InputMaybe<StreamSource>;
  started?: InputMaybe<Scalars['Boolean']['input']>;
  url: Scalars['URL']['input'];
};

export enum StreamSource {
  Twitch = 'TWITCH'
}

export type StreamsInput = {
  seriesID: Scalars['ID']['input'];
  streams: Array<StreamInput>;
};

export enum StructuredBodyLastMatchesSportType {
  Football = 'football',
  Hockey = 'hockey'
}

export enum StructuredBodyListStyle {
  Decimal = 'decimal',
  Disc = 'disc'
}

export enum StructuredBodyListType {
  Ordered = 'ordered',
  Unordered = 'unordered'
}

export enum StructuredBodyOrderedListStyle {
  Decimal = 'decimal',
  Disc = 'disc'
}

export enum StructuredBodyParagraphElementType {
  Break = 'break',
  Link = 'link',
  Text = 'text'
}

export enum StructuredBodyParagraphSize {
  Regular = 'regular',
  Small = 'small'
}

export type SubstageFilter = {
  types?: InputMaybe<Array<CyberSubstageType>>;
};

export enum SubstituteStatus {
  In = 'IN',
  No = 'NO',
  Out = 'OUT'
}

export type SummaryCreateInput = {
  content: Scalars['String']['input'];
  documentID: Scalars['ID']['input'];
  documentType: SummaryDocumentType;
  isEnabled: Scalars['Boolean']['input'];
};

export enum SummaryDocumentType {
  News = 'NEWS',
  Post = 'POST'
}

export type SummaryShortsArgs = {
  limit: Scalars['Int']['input'];
  offset: Scalars['Int']['input'];
};

export type SummaryUpdateInput = {
  content: Scalars['String']['input'];
  documentID: Scalars['ID']['input'];
  documentType: SummaryDocumentType;
  isEnabled: Scalars['Boolean']['input'];
};

export type SupportEmail = {
  attachments?: InputMaybe<Array<Scalars['String']['input']>>;
  shareUserData: Scalars['Boolean']['input'];
  subject: Scalars['String']['input'];
  text: Scalars['String']['input'];
  userEmail: Scalars['String']['input'];
  userName?: InputMaybe<Scalars['String']['input']>;
};

export enum TagBettingWikiType {
  Category = 'CATEGORY',
  Main = 'MAIN',
  Subcategory = 'SUBCATEGORY'
}

export type TagFootballBettingWidgetInput = {
  bookmaker: BookmakerName;
  tagID: Scalars['ID']['input'];
};

export enum TagSubtype {
  Game = 'GAME',
  Organization = 'ORGANIZATION',
  Other = 'OTHER',
  Person = 'PERSON',
  Stadium = 'STADIUM',
  Team = 'TEAM',
  Tournament = 'TOURNAMENT'
}

export type TagTopCreateSuggestionsInput = {
  /** Подсказки */
  suggestions: Array<TagTopSuggestionInput>;
  /** ID топа */
  topID: Scalars['ID']['input'];
};

export type TagTopCreateTopInput = {
  /** Разрешено ли голосование без авторизации на сайте */
  allowUnauthorizedVotes: Scalars['Boolean']['input'];
  /** Дэдлайн топа */
  deadline: Scalars['String']['input'];
  /** Максимально допустимое количество позиций включительно */
  maxPositions: Scalars['Int']['input'];
  /** Минимально допустимое количество позиций включительно */
  minPositions: Scalars['Int']['input'];
  /** Время публикации (с какого времени начинает действовать топ) */
  publishedAt?: InputMaybe<Scalars['String']['input']>;
  /** Строка идентификации */
  slug: Scalars['String']['input'];
  /** Статус */
  status: TagTopStatus;
  /** Название топа */
  title: Scalars['String']['input'];
};

export type TagTopCreateVoteInput = {
  /** Позиции */
  positions: Array<TagTopPositionInput>;
  /** ID топа */
  topID: Scalars['ID']['input'];
};

export type TagTopEditTopInput = {
  /** Разрешено ли голосование без авторизации на сайте */
  allowUnauthorizedVotes: Scalars['Boolean']['input'];
  /** Дэдлайн топа */
  deadline: Scalars['String']['input'];
  /** Идентификатор топа */
  id: Scalars['ID']['input'];
  /** Максимально допустимое количество позиций включительно */
  maxPositions: Scalars['Int']['input'];
  /** Минимально допустимое количество позиций включительно */
  minPositions: Scalars['Int']['input'];
  /** Время публикации (с какого времени начинает действовать топ) */
  publishedAt?: InputMaybe<Scalars['String']['input']>;
  /** Строка идентификации */
  slug: Scalars['String']['input'];
  /** Статус */
  status: TagTopStatus;
  /** Название топа */
  title: Scalars['String']['input'];
};

export type TagTopPositionInput = {
  /** Произвольный ввод пользователя */
  customInput?: InputMaybe<Scalars['String']['input']>;
  /** Место в топе */
  place: Scalars['Int']['input'];
  /** ID тега */
  tagID?: InputMaybe<Scalars['ID']['input']>;
};

/** Статусы топов */
export enum TagTopStatus {
  Active = 'ACTIVE',
  Disabled = 'DISABLED'
}

export type TagTopSuggestionInput = {
  /** Логотип */
  logo?: InputMaybe<Scalars['String']['input']>;
  /** Название */
  name: Scalars['String']['input'];
  /** Порядок для сортировки */
  priority: Scalars['Int']['input'];
  /** ID тега */
  tagID: Scalars['ID']['input'];
};

export type TextOnlineCreateNoteInput = {
  /** Контент в формате SB */
  content: Scalars['String']['input'];
  /** Флаг 'закрепленное сообщение' */
  fixed: Scalars['Boolean']['input'];
  /** Флаг 'ключевой момент' */
  important: Scalars['Boolean']['input'];
  /** Тип сообщения */
  messageType: TextOnlineNoteType;
  /** Минута матча */
  minute?: InputMaybe<Scalars['Int']['input']>;
  /** ID онлайна */
  onlineID: Scalars['ID']['input'];
  /** Время публикации */
  publishedTime: Scalars['Int']['input'];
  /** Заголовок */
  title: Scalars['String']['input'];
};

export type TextOnlineCreateOnlineInput = {
  /** Город проведения */
  city?: InputMaybe<Scalars['String']['input']>;
  /** Назваине события */
  eventName?: InputMaybe<Scalars['String']['input']>;
  /** Дата окончания */
  finishedTime?: InputMaybe<Scalars['Int']['input']>;
  /** ID матча */
  matchID?: InputMaybe<Scalars['ID']['input']>;
  /** ID поста */
  postID?: InputMaybe<Scalars['ID']['input']>;
  /** Дата начала */
  startedTime: Scalars['Int']['input'];
  /** Заголовок */
  title: Scalars['String']['input'];
};

export type TextOnlineDeleteNoteInput = {
  /** ID */
  id: Scalars['ID']['input'];
  /** флаг 'отложенное сообщение' */
  isScheduled: Scalars['Boolean']['input'];
};

export type TextOnlineDeleteOnlineInput = {
  /** ID */
  id: Scalars['ID']['input'];
};

export type TextOnlineEditNoteInput = {
  /** Контент в формате SB */
  content: Scalars['String']['input'];
  /** Флаг 'закрепленное сообщение' */
  fixed: Scalars['Boolean']['input'];
  /** ID сообщения онлайна */
  id: Scalars['ID']['input'];
  /** Флаг 'ключевой момент' */
  important: Scalars['Boolean']['input'];
  /** флаг 'отложенное сообщение' */
  isScheduled: Scalars['Boolean']['input'];
  /** Тип сообщения */
  messageType: TextOnlineNoteType;
  /** Минута матча */
  minute?: InputMaybe<Scalars['Int']['input']>;
  /** Время публикации */
  publishedTime: Scalars['Int']['input'];
  /** Заголовок */
  title: Scalars['String']['input'];
};

export type TextOnlineEditOnlineInput = {
  /** Флаг активный */
  active: Scalars['Boolean']['input'];
  /** Список id авторов */
  authorsIDs: Array<Scalars['ID']['input']>;
  /** Город проведения */
  city?: InputMaybe<Scalars['String']['input']>;
  /** Список доменов */
  domains: Array<Scalars['String']['input']>;
  /** Назваине события */
  eventName?: InputMaybe<Scalars['String']['input']>;
  /** Дата окончания */
  finishedTime?: InputMaybe<Scalars['Int']['input']>;
  /** ID */
  id: Scalars['ID']['input'];
  /** ID матча */
  matchID?: InputMaybe<Scalars['ID']['input']>;
  /** ID поста */
  postID?: InputMaybe<Scalars['ID']['input']>;
  /** Дата начала */
  startedTime?: InputMaybe<Scalars['Int']['input']>;
  /** Заголовок */
  title: Scalars['String']['input'];
};

/** Действия над сообщением текстовой трансляции */
export enum TextOnlineNoteAction {
  Add = 'ADD',
  Delete = 'DELETE',
  Edit = 'EDIT'
}

/** Типы сортировки сообщений текстовых трансляций */
export enum TextOnlineNoteOrder {
  Auto = 'AUTO',
  MinuteAsc = 'MINUTE_ASC',
  MinuteDesc = 'MINUTE_DESC',
  New = 'NEW',
  Old = 'OLD'
}

/** Типы сообщений текстовой трансляции */
export enum TextOnlineNoteType {
  /** «Внимание!» в футбольных трансляциях */
  Attention = 'ATTENTION',
  /** «Гол» в футбольных трансляциях */
  Ball = 'BALL',
  /** Буллит не реализован в хоккейных трансляциях */
  BulletNotScored = 'BULLET_NOT_SCORED',
  /** Буллит реализован в хоккейных трансляциях */
  BulletScored = 'BULLET_SCORED',
  /** «Смена» (обгон) в биатлонных трансляциях */
  Change = 'CHANGE',
  /** Пустой лейбл, используется во всех видах спорта */
  Empty = 'EMPTY',
  /** «Драка» в хоккейных трансляциях */
  Fight = 'FIGHT',
  /** «Финиш» для отдельных спортсменов в биатлонных трансляциях */
  Finish = 'FINISH',
  /** «Нарушение» в хоккейных трансляциях */
  Penalty = 'PENALTY',
  /** Окончание периода в хоккейных трансляциях */
  PeriodEnd = 'PERIOD_END',
  /** Старт периода в хоккейных трансляциях */
  PeriodStart = 'PERIOD_START',
  /** Удаление с площадки в хоккейных трансляциях */
  PlayerRemoved = 'PLAYER_REMOVED',
  /** «Шайба» в хоккейных трансляциях */
  Puck = 'PUCK',
  /** «Красная карточка» в футбольных трансляциях */
  RedCard = 'RED_CARD',
  /** «Замена» в футбольных трансляциях */
  Substitute = 'SUBSTITUTE',
  /** Замена вратаря в хоккейных трансляциях */
  SubstituteGk = 'SUBSTITUTE_GK',
  /** «Мишень»/«Цель» в биатлонных трансляциях */
  Target = 'TARGET',
  /** «Желтая карточка» в футбольных трансляциях */
  YellowCard = 'YELLOW_CARD'
}

export type TextOnlineUnbindOnlineInput = {
  /** ID матча */
  matchID?: InputMaybe<Scalars['ID']['input']>;
  /** ID поста */
  postID?: InputMaybe<Scalars['ID']['input']>;
};

export enum TopTennisRating {
  Atp = 'ATP',
  Wta = 'WTA'
}

export type UpdatableCyberPlayer = {
  avatar: Scalars['URL']['input'];
  firstName: Scalars['String']['input'];
  id: Scalars['ID']['input'];
  lastName: Scalars['String']['input'];
  nickName: Scalars['String']['input'];
};

export type UpdatableCyberSeries = {
  bestOf: Scalars['Int']['input'];
  id: Scalars['ID']['input'];
  isMatchOfTheDay: Scalars['Boolean']['input'];
  matchOfTheDayDate: Scalars['Int']['input'];
};

export type UpdatableCyberSubstage = {
  hasValidTree: Scalars['Boolean']['input'];
  id: Scalars['ID']['input'];
};

export type UpdatableCyberTeam = {
  id: Scalars['ID']['input'];
  logo: Scalars['URL']['input'];
  name: Scalars['String']['input'];
  tag: Scalars['String']['input'];
};

export type UpdatableCyberTournament = {
  id: Scalars['ID']['input'];
  logo: Scalars['URL']['input'];
  title: Scalars['String']['input'];
};

export type UpdateAuthorsInput = {
  authorsIDs: Array<Scalars['ID']['input']>;
  postID: Scalars['ID']['input'];
};

export type UpdateBreakingPushInput = {
  breakingPush: BreakingPushInput;
  newsID: Scalars['ID']['input'];
};

export type UpdateEventInput = {
  eventID: Scalars['ID']['input'];
  minusCount: Scalars['Int']['input'];
  objectID: Scalars['ID']['input'];
  objectType: EventObjectClass;
  plusCount: Scalars['Int']['input'];
  targetTime: Scalars['String']['input'];
};

export type UpdateNewsAdminInput = {
  advertisingDisable?: InputMaybe<Scalars['Boolean']['input']>;
  authorID?: InputMaybe<Scalars['ID']['input']>;
  commentsDisabled?: InputMaybe<Scalars['Boolean']['input']>;
  contentOption?: InputMaybe<Scalars['String']['input']>;
  delayedEvents?: InputMaybe<DelayedEvents>;
  hideAuthor?: InputMaybe<Scalars['Boolean']['input']>;
  hideFromApps?: InputMaybe<Scalars['Boolean']['input']>;
  hideFromIndex?: InputMaybe<Scalars['Boolean']['input']>;
  hideFromWeb?: InputMaybe<Scalars['Boolean']['input']>;
  href?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isUserNews?: InputMaybe<Scalars['Boolean']['input']>;
  main?: InputMaybe<Scalars['Boolean']['input']>;
  mainInSection?: InputMaybe<Scalars['Boolean']['input']>;
  pollID?: InputMaybe<Scalars['Int']['input']>;
  publishedAt?: InputMaybe<Scalars['String']['input']>;
  pushID?: InputMaybe<Scalars['String']['input']>;
  recommendUntil?: InputMaybe<Scalars['String']['input']>;
  sectionsInfo?: InputMaybe<SectionsInfo>;
  seoDescription?: InputMaybe<Scalars['String']['input']>;
  seoHeader?: InputMaybe<Scalars['String']['input']>;
  seoTitle?: InputMaybe<Scalars['String']['input']>;
  socialImage?: InputMaybe<ImageWithCropInput>;
  sourceTitle?: InputMaybe<Scalars['String']['input']>;
  sourceURL?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<NewsStatus>;
  structuredBody?: InputMaybe<Scalars['String']['input']>;
  tags?: InputMaybe<Array<DocumentTagInput>>;
  title?: InputMaybe<Scalars['String']['input']>;
  yandexNewsTitle?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateRelatedDocsInput = {
  relatedDocs: Array<RelatedDoc>;
  sourceDoc: RelatedDoc;
};

export enum UpdateStoryErrorCode {
  ImageRequired = 'IMAGE_REQUIRED'
}

export type UploadImageInput = {
  imageType: ImageType;
  namespace: StatImageNamespaceType;
  objectID: Scalars['String']['input'];
};

export type UploadStatPictureInput = {
  imageType?: InputMaybe<StatImageType>;
  objectID: Scalars['ID']['input'];
  objectType: StatImageObjectType;
};

export type UploadUserPictureInput = {
  imageType: UserImageType;
  objectType: UserImageObjectType;
};

export enum UserImageObjectType {
  UserAvatar = 'USER_AVATAR'
}

export enum UserImageType {
  Main = 'MAIN'
}

export type UserLeagueAddSquadInput = {
  code: Scalars['String']['input'];
  squadID: Scalars['ID']['input'];
};

export enum UserPhoneConfirmErrorCode {
  NoSuchUser = 'NO_SUCH_USER',
  PhoneCodeExpired = 'PHONE_CODE_EXPIRED',
  PhoneConfirmationLimit = 'PHONE_CONFIRMATION_LIMIT',
  PhoneConfirmed = 'PHONE_CONFIRMED',
  PhoneInBlackList = 'PHONE_IN_BLACK_LIST',
  PhoneNoConfirmation = 'PHONE_NO_CONFIRMATION',
  PhoneUsed = 'PHONE_USED',
  PhoneWrongCode = 'PHONE_WRONG_CODE',
  WrongPhone = 'WRONG_PHONE'
}

export enum UserRule {
  AccessDumpster = 'ACCESS_DUMPSTER',
  Autoposter = 'AUTOPOSTER',
  BanInBlogs = 'BAN_IN_BLOGS',
  BanUsers = 'BAN_USERS',
  BecomeInstantFriends = 'BECOME_INSTANT_FRIENDS',
  CanEditBlogs = 'CAN_EDIT_BLOGS',
  CanPinComments = 'CAN_PIN_COMMENTS',
  ChangeRule = 'CHANGE_RULE',
  EditBettingWiki = 'EDIT_BETTING_WIKI',
  EditBookmakers = 'EDIT_BOOKMAKERS',
  EditComments = 'EDIT_COMMENTS',
  EditComplaints = 'EDIT_COMPLAINTS',
  EditCustomPages = 'EDIT_CUSTOM_PAGES',
  EditCyberStat = 'EDIT_CYBER_STAT',
  EditDonations = 'EDIT_DONATIONS',
  EditFantasy = 'EDIT_FANTASY',
  EditFaq = 'EDIT_FAQ',
  EditHru = 'EDIT_HRU',
  EditMenu = 'EDIT_MENU',
  EditNews = 'EDIT_NEWS',
  EditOfficialDocs = 'EDIT_OFFICIAL_DOCS',
  EditPageInfo = 'EDIT_PAGE_INFO',
  EditPolls = 'EDIT_POLLS',
  EditPosts = 'EDIT_POSTS',
  EditPredictionHub = 'EDIT_PREDICTION_HUB',
  EditRelatedDocs = 'EDIT_RELATED_DOCS',
  EditSections = 'EDIT_SECTIONS',
  EditStatPictures = 'EDIT_STAT_PICTURES',
  EditStopwords = 'EDIT_STOPWORDS',
  EditSummary = 'EDIT_SUMMARY',
  EditTags = 'EDIT_TAGS',
  EditTagTop = 'EDIT_TAG_TOP',
  EditTextOnline = 'EDIT_TEXT_ONLINE',
  EditUsers = 'EDIT_USERS',
  EditUserBadges = 'EDIT_USER_BADGES',
  IndexContent = 'INDEX_CONTENT',
  Infographics = 'INFOGRAPHICS',
  LoginByOtherUser = 'LOGIN_BY_OTHER_USER',
  LogoutOtherUser = 'LOGOUT_OTHER_USER',
  SkipPostValidation = 'SKIP_POST_VALIDATION',
  UserTestSessions = 'USER_TEST_SESSIONS',
  UsePlusGun = 'USE_PLUS_GUN',
  UsePusher = 'USE_PUSHER',
  UseStopWordsPosts = 'USE_STOP_WORDS_POSTS'
}

export type UsersWithRulesInput = {
  amount: Scalars['Int']['input'];
  filter: UsersWithRulesFilter;
  pageNum: Scalars['Int']['input'];
};

export enum VoteResult {
  Draw = 'draw',
  First = 'first',
  Second = 'second'
}

export type VoteSeriesResultInput = {
  outcome: SeriesOutcome;
  seriesID: Scalars['ID']['input'];
};

export enum WinterOlympicEventStatus {
  Closed = 'CLOSED',
  Live = 'LIVE',
  NotStarted = 'NOT_STARTED'
}

export enum WinterOlympicFilterMedalType {
  BronzeFilterMedalType = 'BRONZE_FILTER_MEDAL_TYPE',
  GoldFilterMedalType = 'GOLD_FILTER_MEDAL_TYPE',
  MedalsFilterMedalType = 'MEDALS_FILTER_MEDAL_TYPE'
}

export type WinterOlympicGameInput = {
  id: Scalars['ID']['input'];
};

export enum WinterOlympicHeaderType {
  OlympicHeader = 'OLYMPIC_HEADER',
  RussianOlympicTeamHeader = 'RUSSIAN_OLYMPIC_TEAM_HEADER'
}

export enum WinterOlympicMedalStatus {
  Medals = 'MEDALS',
  NoCompetition = 'NO_COMPETITION',
  NoMedals = 'NO_MEDALS'
}

export enum WinterOlympicMedalType {
  Bronze = 'BRONZE',
  Gold = 'GOLD',
  Silver = 'SILVER',
  UndefinedMedalType = 'UNDEFINED_MEDAL_TYPE'
}

export enum WinterOlympicParticipantType {
  Person = 'PERSON',
  Team = 'TEAM',
  UndefinedParticipantType = 'UNDEFINED_PARTICIPANT_TYPE'
}

export enum WinterOlympicPersonGender {
  Female = 'FEMALE',
  Male = 'MALE'
}

export type WinterOlympicPictureLogoInput = {
  ext?: PictureExtension;
  resize?: PictureLogoSize;
};

export type WinterOlympicRussianTeamFilter = {
  gender?: InputMaybe<WinterOlympicPersonGender>;
  sportId?: InputMaybe<Scalars['ID']['input']>;
};

export type WinterOlympicRussianTeamPagination = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first: Scalars['Int']['input'];
  last?: InputMaybe<Scalars['Int']['input']>;
};

export type WinterOlympicTopByMedalsArgs = {
  limit: Scalars['Int']['input'];
};

export type WinterOlympicsFiveEventsInput = {
  dateTime?: InputMaybe<Scalars['String']['input']>;
  typeEvent: WinterOlympicsFiveEventsType;
};

export enum WinterOlympicsFiveEventsType {
  LastFive = 'LAST_FIVE',
  NextFive = 'NEXT_FIVE'
}

export enum WinterOlympicsMedalType {
  Bronze = 'BRONZE',
  Gold = 'GOLD',
  None = 'NONE',
  Silver = 'SILVER'
}

export type AddComplaintInput = {
  /**  Тип жалобы (SPAM, SWEARS и т.д.)   */
  complaintType: ComplaintType;
  locale: Scalars['String']['input'];
  /**  Class объекта жалобы (enum)  */
  objectClassType?: InputMaybe<ObjectClass>;
  /**  ID объекта жалобы   */
  objectID: Scalars['String']['input'];
  /**  Автор контента   */
  objectUserID?: InputMaybe<Scalars['String']['input']>;
  /**  Флаг для принудительного изменения статуса контента жалобы в OPEN  */
  reopen?: InputMaybe<Scalars['Boolean']['input']>;
  /**  Автор жалобы   */
  userID: Scalars['String']['input'];
};

export enum AdminAction {
  /** Доступ к dumpster */
  AccessDumpster = 'ACCESS_DUMPSTER',
  /** Доступ к админке бейджей пользователей */
  AdminAccessBadges = 'ADMIN_ACCESS_BADGES',
  /** Доступ к управлению блогами */
  AdminAccessBlogs = 'ADMIN_ACCESS_BLOGS',
  /** Доступ к админке букмекеров */
  AdminAccessBookmakers = 'ADMIN_ACCESS_BOOKMAKERS',
  /** Доступ к админке кастомных страниц */
  AdminAccessCustomPages = 'ADMIN_ACCESS_CUSTOM_PAGES',
  /** Доступ к разводящей админок */
  AdminAccessIndex = 'ADMIN_ACCESS_INDEX',
  /** Доступ к админке генератора инфографики */
  AdminAccessInfographics = 'ADMIN_ACCESS_INFOGRAPHICS',
  /** Доступ к админке вкладок меню */
  AdminAccessMenu = 'ADMIN_ACCESS_MENU',
  /** Доступ к админке мобильных пушей */
  AdminAccessMobilePushes = 'ADMIN_ACCESS_MOBILE_PUSHES',
  /** Доступ к админке модерации */
  AdminAccessModeration = 'ADMIN_ACCESS_MODERATION',
  /** Доступ к админке новостей */
  AdminAccessNews = 'ADMIN_ACCESS_NEWS',
  /** Доступ к админке постов */
  AdminAccessPost = 'ADMIN_ACCESS_POST',
  /** Доступ к управлению прогнозами в Хабе прогнозов */
  AdminAccessPredictionHub = 'ADMIN_ACCESS_PREDICTION_HUB',
  /** Доступ к админке тегов */
  AdminAccessTag = 'ADMIN_ACCESS_TAG',
  /** Доступ к админке рейтингов */
  AdminAccessTagTop = 'ADMIN_ACCESS_TAG_TOP',
  /** Доступ к админке текстовых трансляций */
  AdminAccessTextOnline = 'ADMIN_ACCESS_TEXT_ONLINE',
  /** Доступ к управлению пользователями */
  AdminAccessUsers = 'ADMIN_ACCESS_USERS',
  /** Доступ к управлению правами пользователей */
  AdminAccessUsersRules = 'ADMIN_ACCESS_USERS_RULES'
}

export enum AutoposterDocumentType {
  Post = 'POST',
  UserNews = 'USER_NEWS'
}

export type AutoposterUploadInput = {
  docType: AutoposterDocumentType;
  googleDocUrl: Scalars['String']['input'];
  sportID: Scalars['ID']['input'];
};

export type BanCampaignInput = {
  campaignID: Scalars['ID']['input'];
};

export enum BanLevelEnum {
  Fifth = 'FIFTH',
  First = 'FIRST',
  Fourth = 'FOURTH',
  Second = 'SECOND',
  Third = 'THIRD',
  Unban = 'UNBAN'
}

export enum BanObjectClass {
  Article = 'ARTICLE',
  BookmakerOpinion = 'BOOKMAKER_OPINION',
  ClassUser = 'CLASS_USER',
  Comments = 'COMMENTS',
  Conference = 'CONFERENCE',
  Forum = 'FORUM',
  News = 'NEWS',
  Photo = 'PHOTO',
  PhotoGallery = 'PHOTO_GALLERY',
  Poll = 'POLL',
  Post = 'POST',
  Rumour = 'RUMOUR',
  Status2 = 'STATUS2',
  StopWord = 'STOP_WORD',
  UserNews = 'USER_NEWS'
}

export enum BlogPostRole {
  /**  автор поста  */
  Author = 'AUTHOR',
  /**  автор в блоге  */
  BlogAuthor = 'BLOG_AUTHOR',
  /**  модератор блога  */
  BlogModerator = 'BLOG_MODERATOR',
  /**  владелец блога  */
  BlogOwner = 'BLOG_OWNER',
  /**  коммент не к посту  */
  Undefined = 'UNDEFINED'
}

export type BroadcastInput = {
  ISO2?: Scalars['String']['input'];
  source: VideoSource;
};

export enum CardType {
  Master = 'MASTER',
  Mir = 'MIR',
  Undefined = 'UNDEFINED',
  Visa = 'VISA'
}

export type ChatMessageComplaintInput = {
  chatId: Scalars['ID']['input'];
  chatMessageId: Scalars['ID']['input'];
  reason?: InputMaybe<Scalars['String']['input']>;
};

export enum ClubType {
  Club = 'CLUB',
  NationalTeam = 'NATIONAL_TEAM'
}

/** Действия над комментариями */
export enum CommentAction {
  Add = 'ADD',
  Edit = 'EDIT'
}

/** Доступные действия над комментариями */
export enum CommentEnableAction {
  Abuse = 'ABUSE',
  AddToBlacklist = 'ADD_TO_BLACKLIST',
  AddToBlacklistTemporary = 'ADD_TO_BLACKLIST_TEMPORARY',
  BanInBlog = 'BAN_IN_BLOG',
  BanInMyBlogs = 'BAN_IN_MY_BLOGS',
  BanInPosts = 'BAN_IN_POSTS',
  BanUserPermanent = 'BAN_USER_PERMANENT',
  BanUserTemporary = 'BAN_USER_TEMPORARY',
  CopyLink = 'COPY_LINK',
  CopyText = 'COPY_TEXT',
  Delete = 'DELETE',
  DeleteComments = 'DELETE_COMMENTS',
  Edit = 'EDIT',
  Pin = 'PIN',
  RemoveFromBlacklist = 'REMOVE_FROM_BLACKLIST',
  UnbanInBlog = 'UNBAN_IN_BLOG',
  UnbanInPosts = 'UNBAN_IN_POSTS',
  Unpin = 'UNPIN'
}

/** Статусы комментариев */
export enum CommentStatus {
  Active = 'ACTIVE',
  All = 'ALL',
  Deleted = 'DELETED'
}

/** Типы комментариев */
export enum CommentType {
  All = 'ALL',
  Top = 'TOP'
}

/** Типы сортировки комментариев */
export enum CommentsOrder {
  Actual = 'ACTUAL',
  Best = 'BEST',
  New = 'NEW',
  Old = 'OLD',
  Rating = 'RATING'
}

export enum ComplaintContentStatus {
  Approved = 'APPROVED',
  Declined = 'DECLINED',
  Open = 'OPEN'
}

export enum ComplaintContentsOrder {
  ComplaintCountDesc = 'COMPLAINT_COUNT_DESC',
  LastComplaintDesc = 'LAST_COMPLAINT_DESC'
}

export enum ComplaintType {
  Insult = 'INSULT',
  /**  Мульти-аккаунтинг  */
  MultiAccounting = 'MULTI_ACCOUNTING',
  Other = 'OTHER',
  /**  Провокации  */
  Provocations = 'PROVOCATIONS',
  Racism = 'RACISM',
  Report = 'REPORT',
  Spam = 'SPAM',
  Swears = 'SWEARS',
  /**  Систематический оффтом  */
  SystematicOfftop = 'SYSTEMATIC_OFFTOP',
  Threats = 'THREATS'
}

/** Типы контрактов */
export enum ContractType {
  Man = 'MAN',
  Unspecified = 'UNSPECIFIED',
  Women = 'WOMEN',
  Youth = 'YOUTH'
}

/** Формат картинок для флага */
export enum CountryImageFormat {
  Png = 'PNG',
  Svg = 'SVG'
}

export type CreateCampaignInput = {
  /** Необходимая сумма */
  amount: Scalars['Float']['input'];
  /** Дата окончания сбора */
  expireAt: Scalars['String']['input'];
  /** Цель сбора, на что собираем */
  name: Scalars['String']['input'];
};

export type DelayedEvents = {
  activationTime?: InputMaybe<Scalars['String']['input']>;
  deactivationTime?: InputMaybe<Scalars['String']['input']>;
};

export type DeleteCampaignInput = {
  /** ID сбора */
  id: Scalars['ID']['input'];
};

export type DocInput = {
  id: Scalars['ID']['input'];
  kind: DocumentKind;
};

export enum DocumentKind {
  Article = 'ARTICLE',
  News = 'NEWS',
  Photo = 'PHOTO',
  Poll = 'POLL',
  Post = 'POST',
  Status = 'STATUS',
  UserNews = 'USER_NEWS',
  Video = 'VIDEO'
}

export type EditCampaignInput = {
  /** Необходимая сумма */
  amount: Scalars['Float']['input'];
  /** Дата окончания сбора */
  expireAt: Scalars['String']['input'];
  /** ID сбора */
  id: Scalars['ID']['input'];
  /** Цель сбора, на что собираем */
  name: Scalars['String']['input'];
};

/** Источники/редакторы для поста */
export enum EditSource {
  Admin = 'ADMIN',
  Wysiwyg = 'WYSIWYG'
}

export type EntityByUrlInput = {
  url: Scalars['String']['input'];
};

export enum ExpandTournaments {
  All = 'ALL',
  First5 = 'FIRST5'
}

/** Регион популярности */
export enum GeoCodePopular {
  /** Бразилия */
  Br = 'BR',
  /** Россия ONBOARDING */
  OnboardingRu = 'ONBOARDING_RU',
  /** Россия */
  Ru = 'RU'
}

export type GetLeagueByInviteToken = {
  inviteToken: Scalars['ID']['input'];
};

export type GetLeagueBySeasonId = {
  seasonID?: InputMaybe<Scalars['Int']['input']>;
};

export type GetPredictorRankingInput = {
  competitionId: Scalars['ID']['input'];
  competitionType: PredictorCompetitionType;
  cursor?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  source?: InputMaybe<PredictorSeasonSource>;
};

export type GetUpdateInput = {
  bundleID: Scalars['String']['input'];
  codeVersion: Scalars['Int']['input'];
  lang: AppLang;
  osVersion: Scalars['String']['input'];
  platform: MobilePlatform;
  theme: AppTheme;
  version: Scalars['String']['input'];
};

export type GetUsersSeasonsInput = {
  userId: Scalars['ID']['input'];
};

export type GetWidgetPointsAndRanking = {
  seasonId: Scalars['ID']['input'];
};

export enum GraphMedal {
  MedalBronze = 'MEDAL_BRONZE',
  MedalGold = 'MEDAL_GOLD',
  MedalSilver = 'MEDAL_SILVER'
}

export enum GraphStageName {
  EightThFinals = 'EIGHT_TH_FINALS',
  Final = 'FINAL',
  OneRdQualifyingRound = 'ONE_RD_QUALIFYING_ROUND',
  OneStQualifyingRound = 'ONE_ST_QUALIFYING_ROUND',
  PlayOffs = 'PLAY_OFFS',
  PreliminaryFinal = 'PRELIMINARY_FINAL',
  PreliminarySemiFinals = 'PRELIMINARY_SEMI_FINALS',
  QuarterFinals = 'QUARTER_FINALS',
  SemiFinals = 'SEMI_FINALS',
  ThreeRdPlaceFinal = 'THREE_RD_PLACE_FINAL',
  ThreeRdQualifyingRound = 'THREE_RD_QUALIFYING_ROUND',
  TwoNdQualifyingRound = 'TWO_ND_QUALIFYING_ROUND',
  TwoRdQualifyingRound = 'TWO_RD_QUALIFYING_ROUND',
  Unknown = 'UNKNOWN'
}

export type HistoryCampaignsInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  lastID?: InputMaybe<Scalars['ID']['input']>;
  statuses?: InputMaybe<Array<CampaignStatus>>;
};

export enum HockeyEventType {
  BreakStart = 'BREAK_START',
  Bullit = 'BULLIT',
  Goal = 'GOAL',
  MatchEnd = 'MATCH_END',
  MatchStart = 'MATCH_START',
  OffTheIce = 'OFF_THE_ICE',
  PenaltyShot = 'PENALTY_SHOT',
  PenaltyShotMiss = 'PENALTY_SHOT_MISS',
  PeriodStart = 'PERIOD_START',
  Unknown = 'UNKNOWN',
  UpdateCurrentTime = 'UPDATE_CURRENT_TIME'
}

/** Период */
export enum HockeyPeriod {
  Intermission_1 = 'INTERMISSION_1',
  Intermission_2 = 'INTERMISSION_2',
  Overtime = 'OVERTIME',
  OvertimeToBePlayed = 'OVERTIME_TO_BE_PLAYED',
  PenaltyShootout = 'PENALTY_SHOOTOUT',
  PenaltyShootoutToBePlayed = 'PENALTY_SHOOTOUT_TO_BE_PLAYED',
  Period_1 = 'PERIOD_1',
  Period_2 = 'PERIOD_2',
  Period_3 = 'PERIOD_3',
  PostMatch = 'POST_MATCH',
  PreMatch = 'PRE_MATCH'
}

export type HockeySearchInput = {
  /** Текст запроса */
  search: Scalars['String']['input'];
  /** Искомые типы */
  type: Array<HockeySearchType>;
};

/** Типы сущностей */
export enum HockeySearchType {
  /** Игрок */
  HockeyPlayer = 'HOCKEY_PLAYER',
  /** Команда */
  HockeyTeam = 'HOCKEY_TEAM',
  /** Турниры */
  HockeyTournament = 'HOCKEY_TOURNAMENT'
}

export enum HockeyTeamStrength {
  Even = 'EVEN',
  Powerplay = 'POWERPLAY',
  Shorthanded = 'SHORTHANDED'
}

/** Типы событий */
export enum HockeyVersusWinPeriod {
  Overtime = 'OVERTIME',
  RegularTime = 'REGULAR_TIME',
  Shootouts = 'SHOOTOUTS'
}

export enum HruApiEntityKind {
  Match = 'MATCH',
  News = 'NEWS',
  Post = 'POST',
  Status = 'STATUS'
}

export enum HruApiEntitySport {
  Basketball = 'BASKETBALL',
  Football = 'FOOTBALL',
  Hockey = 'HOCKEY',
  Tennis = 'TENNIS'
}

export type InitCampaignOrderInput = {
  amount: Scalars['Float']['input'];
  campaignID: Scalars['ID']['input'];
};

export type InputParticipants = {
  id?: InputMaybe<Scalars['String']['input']>;
};

export type LeagueRankingInput = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type LeagueRoundRankingInput = {
  cursor?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  roundId: Scalars['ID']['input'];
};

/** Сортировка лайнапа */
export enum LineupSort {
  AssistAsc = 'ASSIST_ASC',
  AssistDesc = 'ASSIST_DESC',
  GoalAsc = 'GOAL_ASC',
  GoalDesc = 'GOAL_DESC',
  PointsAsc = 'POINTS_ASC',
  PointsDesc = 'POINTS_DESC'
}

export type ListBannedCampaignInput = {
  amount?: InputMaybe<Scalars['Int']['input']>;
  lastID?: InputMaybe<Scalars['ID']['input']>;
  userID: Scalars['ID']['input'];
};

export type LogoIdInput = {
  id: Scalars['String']['input'];
};

/** Результат загрузки фото */
export type LogoPlayerUpdateInput = {
  /** Формат */
  format: PlayerImageFormat;
  /** Идентификатор */
  id: Scalars['String']['input'];
  /** Проект */
  product: ProductType;
  /** Адрес */
  url: Scalars['String']['input'];
};

/** Входные данные для обновления статистических логотипов */
export type LogoTeamUpdateInput = {
  /** Формат картинки */
  format: TeamImageFormat;
  /** Идентификатор */
  id: Scalars['String']['input'];
  /** Продукт */
  product: ProductType;
  /** Адрес */
  url: Scalars['String']['input'];
};

/** Данные для обновления логотипов */
export type LogoTournamentInput = {
  /** Формат логотипа */
  format: TournamentImageFormat;
  /** Идентификатор */
  id: Scalars['String']['input'];
  /** Продукт для которого использовать логотип */
  product: ProductType;
  /** Адрес */
  url: Scalars['String']['input'];
};

/** Типы периодов */
export enum MatchStatus {
  /** The match has been abandoned */
  Abandoned = 'ABANDONED',
  /**
   * The match has been canceled and will not be played
   * @deprecated Use CANCELLED instead
   */
  Canceled = 'CANCELED',
  /** The match has been canceled and will not be played */
  Cancelled = 'CANCELLED',
  /** The match results have been confirmed */
  Closed = 'CLOSED',
  /** The match has been temporarily delayed and will be continued */
  Delayed = 'DELAYED',
  /** The match is over */
  Ended = 'ENDED',
  /** The match is currently in progress */
  Live = 'LIVE',
  /** The match is scheduled to be played */
  NotStarted = 'NOT_STARTED',
  /** The match has been postponed to a future date */
  Postponed = 'POSTPONED',
  /** The start of the match has been temporarily delayed */
  StartDelayed = 'START_DELAYED',
  /** default */
  Undefined = 'UNDEFINED'
}

export enum MatchTeamType {
  All = 'ALL',
  Away = 'AWAY',
  Home = 'HOME',
  Tournament = 'TOURNAMENT'
}

/** Параметры для запроса матчи за день */
export type MatchesByDateFilter = {
  /** День в формате *yyyy-mm-dd* */
  date: Scalars['String']['input'];
  /** Длина дня */
  dayLength?: InputMaybe<Scalars['String']['input']>;
  /** Только матчи с SportsId в Ubersetzer */
  hasSportsId?: InputMaybe<Scalars['Boolean']['input']>;
  /** Источник id для турниров */
  source?: InputMaybe<StatSourceList>;
  /** Фильтр по статусам матча */
  status?: InputMaybe<Array<MatchStatus>>;
  /** Часовой пояс в формате *±hh:mm* */
  timezone?: InputMaybe<Scalars['String']['input']>;
  /** Фильтр по списку турниров */
  tournamentIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export enum MatchesByDateSort {
  /** сортировка по возрастанию по началу матча */
  AscScheduledAt = 'ASC_SCHEDULED_AT',
  /** сортировка по убыванию по началу матча */
  DescScheduledAt = 'DESC_SCHEDULED_AT',
  /** сортировка по убыванию приоритета матчей */
  Priority = 'PRIORITY'
}

export type McCustomSettingsFilter = {
  /** Фильтр по гео */
  geo_code?: InputMaybe<GeoCodePopular>;
  /** Фильтр по списку турниров */
  tournamentIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

/** сделал только фильтр по видам спорта, нужны ли будут другие виды фильтров? */
export type McInputFilter = {
  /** Фильтр по букмейкеру */
  bookmaker?: InputMaybe<BookmakerName>;
  /** День в формате *yyyy-mm-dd* */
  date: Scalars['String']['input'];
  /** Длина дня */
  dayLength?: InputMaybe<Scalars['String']['input']>;
  /** Фильтр по гео */
  geo_code?: InputMaybe<GeoCodePopular>;
  /** Фильтр по live + ещё неначавшимся в указанный период */
  livePlusUpcomingSpan?: InputMaybe<Scalars['String']['input']>;
  /** Фильтр по видам спорта */
  sports?: InputMaybe<Array<McKindOfSport>>;
  /** Фильтр по статусам матча */
  status?: InputMaybe<Array<MatchStatus>>;
  /** Часовой пояс в формате *±hh:mm* */
  timezone?: InputMaybe<Scalars['String']['input']>;
  /** Фильтр по списку турниров */
  tournamentIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

/** Виды спорта в матч-центре */
export enum McKindOfSport {
  TeaserCs = 'TEASER_CS',
  TeaserDota = 'TEASER_DOTA',
  TeaserFootball = 'TEASER_FOOTBALL',
  TeaserIcehockey = 'TEASER_ICEHOCKEY'
}

export enum MessageAction {
  Add = 'ADD',
  Edit = 'EDIT'
}

/**  фильтры (ALL - все новости, MAIN - только главные)  */
export enum NewsFilter {
  All = 'ALL',
  Main = 'MAIN'
}

/** Варианты подбора новости */
export enum NextNewsVariant {
  ChronMain = 'CHRON_MAIN',
  ChronSection = 'CHRON_SECTION'
}

/** Варианты подбора поста */
export enum NextPostVariant {
  ChronMain = 'CHRON_MAIN',
  ChronSection = 'CHRON_SECTION',
  LikeRecsys = 'LIKE_RECSYS',
  Trans4Rec = 'TRANS4REC'
}

export enum NotificationKind {
  FantasyDayBefore = 'FANTASY_DAY_BEFORE',
  FantasyDeadline = 'FANTASY_DEADLINE',
  FantasyHourBefore = 'FANTASY_HOUR_BEFORE',
  FantasyMute = 'FANTASY_MUTE',
  FantasyRoundResults = 'FANTASY_ROUND_RESULTS',
  Mail = 'MAIL',
  MailChunk = 'MAIL_CHUNK',
  MailSystem = 'MAIL_SYSTEM',
  UserBadgeAvailable = 'USER_BADGE_AVAILABLE',
  UserBadgeUnavailable = 'USER_BADGE_UNAVAILABLE',
  UserComment = 'USER_COMMENT',
  UserCommentAnswer = 'USER_COMMENT_ANSWER',
  UserCommentAnswerChunk = 'USER_COMMENT_ANSWER_CHUNK',
  UserCommentChunk = 'USER_COMMENT_CHUNK',
  UserStatusShare = 'USER_STATUS_SHARE',
  UserSubscribed = 'USER_SUBSCRIBED'
}

export enum ObjectClass {
  Article = 'ARTICLE',
  BookmakerOpinion = 'BOOKMAKER_OPINION',
  Chat = 'CHAT',
  ChatMessage = 'CHAT_MESSAGE',
  Comment = 'COMMENT',
  Forum = 'FORUM',
  News = 'NEWS',
  Photo = 'PHOTO',
  Poll = 'POLL',
  Post = 'POST',
  Status = 'STATUS',
  UserNews = 'USER_NEWS',
  Video = 'VIDEO'
}

export enum ObjectEditEventAction {
  EditorAdd = 'EDITOR_ADD',
  EditorDel = 'EDITOR_DEL'
}

export enum OrderDirection {
  Asc = 'ASC',
  Desc = 'DESC'
}

export enum PageSubtype {
  About = 'ABOUT',
  Add = 'ADD',
  App = 'APP',
  Athletes = 'ATHLETES',
  Bonus = 'BONUS',
  Bookmaker = 'BOOKMAKER',
  Calendar = 'CALENDAR',
  CalendarDate = 'CALENDAR_DATE',
  CalendarGroup = 'CALENDAR_GROUP',
  Coaches = 'COACHES',
  Countries = 'COUNTRIES',
  /** @deprecated Use `CALENDAR_DATE`. */
  Date = 'DATE',
  Edit = 'EDIT',
  Grid = 'GRID',
  /** @deprecated Use `CALENDAR_GROUP`. */
  Group = 'GROUP',
  Lineups = 'LINEUPS',
  List = 'LIST',
  Live = 'LIVE',
  Main = 'MAIN',
  News = 'NEWS',
  Odds = 'ODDS',
  Online = 'ONLINE',
  Poll = 'POLL',
  Posts = 'POSTS',
  Prediction = 'PREDICTION',
  Predictions = 'PREDICTIONS',
  PredictionSportsEvent = 'PREDICTION_SPORTS_EVENT',
  Prizes = 'PRIZES',
  Ratings = 'RATINGS',
  Results = 'RESULTS',
  Reviews = 'REVIEWS',
  Rules = 'RULES',
  Scheme = 'SCHEME',
  Sports = 'SPORTS',
  Stadiums = 'STADIUMS',
  Stat = 'STAT',
  StatAssistances = 'STAT_ASSISTANCES',
  StatBombardiers = 'STAT_BOMBARDIERS',
  StatFouls = 'STAT_FOULS',
  StatKeepers = 'STAT_KEEPERS',
  Table = 'TABLE',
  TableGroup = 'TABLE_GROUP',
  TablePlayoff = 'TABLE_PLAYOFF',
  Team = 'TEAM',
  Teams = 'TEAMS',
  Tickets = 'TICKETS',
  Tournament = 'TOURNAMENT',
  Video = 'VIDEO'
}

export enum PageType {
  AmateurSportContest = 'AMATEUR_SPORT_CONTEST',
  BookmakerRating = 'BOOKMAKER_RATING',
  CyberMatchCenter = 'CYBER_MATCH_CENTER',
  CyberMatchCenterTournament = 'CYBER_MATCH_CENTER_TOURNAMENT',
  CyberTournament = 'CYBER_TOURNAMENT',
  DotaMatch = 'DOTA_MATCH',
  FantasyIndex = 'FANTASY_INDEX',
  FantasySquad = 'FANTASY_SQUAD',
  FantasyTournament = 'FANTASY_TOURNAMENT',
  Faq = 'FAQ',
  Hub = 'HUB',
  Match = 'MATCH',
  News = 'NEWS',
  Olympic = 'OLYMPIC',
  Poll = 'POLL',
  Post = 'POST',
  PredictionHub = 'PREDICTION_HUB',
  Predictor = 'PREDICTOR',
  PredictorIndex = 'PREDICTOR_INDEX',
  PredictorTournament = 'PREDICTOR_TOURNAMENT',
  Short = 'SHORT',
  TagOther = 'TAG_OTHER',
  TagTournament = 'TAG_TOURNAMENT'
}

export type PickedTagInput = {
  /** Ранг в сортировке */
  rank: Scalars['Int']['input'];
  /** ID тэга */
  tagID: Scalars['ID']['input'];
};

/** Типы платформ комментариев */
export enum PlatformType {
  Android = 'ANDROID',
  DesktopWeb = 'DESKTOP_WEB',
  Ios = 'IOS',
  MobileWeb = 'MOBILE_WEB'
}

export enum PlayerFoot {
  Both = 'BOTH',
  Left = 'LEFT',
  None = 'NONE',
  Right = 'RIGHT'
}

export enum PlayerGender {
  Female = 'FEMALE',
  Male = 'MALE',
  None = 'NONE'
}

/** Форматы картинок */
export enum PlayerImageFormat {
  /** Маленькая */
  Avatar = 'AVATAR',
  /** Большая */
  Fullhd = 'FULLHD'
}

export enum PlayerStatus {
  Active = 'ACTIVE',
  Died = 'DIED',
  None = 'NONE',
  Retired = 'RETIRED'
}

/** Доступные действия над опросом */
export enum PollActions {
  Edit = 'EDIT'
}

export enum PollCustomType {
  Bookmaker = 'BOOKMAKER',
  Branded = 'BRANDED',
  Default = 'DEFAULT'
}

export enum PollState {
  Active = 'ACTIVE',
  Ended = 'ENDED',
  NotStarted = 'NOT_STARTED'
}

export enum PollStatus {
  Active = 'ACTIVE',
  All = 'ALL'
}

/** Доступные действия над постом */
export enum PostEnableAction {
  Admin = 'ADMIN',
  Delete = 'DELETE',
  Edit = 'EDIT',
  Hide = 'HIDE',
  HideFromSection = 'HIDE_FROM_SECTION',
  Restore = 'RESTORE',
  Show = 'SHOW',
  ShowInSection = 'SHOW_IN_SECTION'
}

/** Вариант отображения (заглушки или фактоиды) */
export enum PredictionFactoidsDisplay {
  Factoids = 'FACTOIDS',
  InsufficientData = 'INSUFFICIENT_DATA',
  NoRounds = 'NO_ROUNDS'
}

export type PredictionGetSeasonsInput = {
  seasonIds: Array<Scalars['ID']['input']>;
  source?: InputMaybe<PredictorSeasonSource>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type PredictionItemInput = {
  away?: InputMaybe<Scalars['Int']['input']>;
  bonusX2?: InputMaybe<Scalars['Int']['input']>;
  gameId: Scalars['ID']['input'];
  home?: InputMaybe<Scalars['Int']['input']>;
};

export enum PredictionLabelResult {
  Fail = 'FAIL',
  NotCounted = 'NOT_COUNTED',
  Success = 'SUCCESS'
}

export enum PredictionRoundStatus {
  Active = 'ACTIVE',
  Completed = 'COMPLETED',
  Live = 'LIVE',
  NotPrepared = 'NOT_PREPARED'
}

export type PredictionRoundsInput = {
  id: Scalars['ID']['input'];
};

export type PredictionSyncInput = {
  items: Array<PredictionItemInput>;
  roundId: Scalars['ID']['input'];
};

export enum PredictorCompetitionType {
  Round = 'ROUND',
  Season = 'SEASON'
}

export enum PredictorSeasonSource {
  Hru = 'HRU',
  Id = 'ID',
  TagId = 'TAG_ID'
}

/** Типы продуктов */
export enum ProductType {
  /** Betting Insider */
  Betting = 'BETTING',
  /** Sports.ru */
  Sportsru = 'SPORTSRU',
  /** Международные проекты */
  Tribuna = 'TRIBUNA'
}

export enum RankType {
  Atp = 'ATP',
  Wta = 'WTA'
}

export enum RateAction {
  Minus = 'MINUS',
  Plus = 'PLUS'
}

export enum RateObjectClass {
  Article = 'ARTICLE',
  BookmakerOpinion = 'BOOKMAKER_OPINION',
  Comment = 'COMMENT',
  News = 'NEWS',
  Photo = 'PHOTO',
  PhotoGallery = 'PHOTO_GALLERY',
  Poll = 'POLL',
  Post = 'POST',
  Status = 'STATUS',
  Usernews = 'USERNEWS'
}

export enum RateResultType {
  Change = 'CHANGE',
  Error = 'ERROR',
  New = 'NEW',
  Revoke = 'REVOKE'
}

/** Фильтр по рейтингу */
export enum RatingFilter {
  Any = 'ANY',
  Negative = 'NEGATIVE',
  Positive = 'POSITIVE'
}

export enum RecommendationDocFilter {
  All = 'ALL',
  News = 'NEWS',
  Post = 'POST'
}

/** Типы судей */
export enum RefereeTypeFilter {
  /** Главный */
  Main = 'main'
}

/**  через что регистрировался пользователь  */
export enum RegistrationSources {
  Apple = 'APPLE',
  Direct = 'DIRECT',
  Fb = 'FB',
  Google = 'GOOGLE',
  Steam = 'STEAM',
  Vk = 'VK',
  Yandex = 'YANDEX'
}

export type RelatedDoc = {
  ID: Scalars['ID']['input'];
  IsCustom?: InputMaybe<Scalars['Boolean']['input']>;
  Type: DocumentKind;
};

export enum ResourceName {
  ButtonImage = 'BUTTON_IMAGE',
  ButtonUrl = 'BUTTON_URL',
  PlayerImage = 'PLAYER_IMAGE',
  PlayerUrl = 'PLAYER_URL'
}

export enum SearchDocumentType {
  Blog = 'BLOG',
  Faq = 'FAQ',
  News = 'NEWS',
  Post = 'POST',
  Tag = 'TAG',
  User = 'USER'
}

/** Запрос на поиск */
export type SearchInput = {
  /** Текст запроса */
  search: Scalars['String']['input'];
  /** Искомые типы */
  type: Array<SearchType>;
};

/** Типы сущностей */
export enum SearchType {
  /** Игрок */
  Player = 'PLAYER',
  /** Команда */
  Team = 'TEAM',
  /** Турниры */
  Tournament = 'TOURNAMENT',
  /** Стадионы */
  Venue = 'VENUE'
}

export enum SettingsField {
  FieldCommentsFilterSort = 'FIELD_COMMENTS_FILTER_SORT',
  FieldDonationsEnabled = 'FIELD_DONATIONS_ENABLED',
  FieldMobileCommentsOrder = 'FIELD_MOBILE_COMMENTS_ORDER',
  FieldShortSportsOnboardingDone = 'FIELD_SHORT_SPORTS_ONBOARDING_DONE',
  FieldWysiwygVersion = 'FIELD_WYSIWYG_VERSION'
}

export enum SportsType {
  Basketball = 'BASKETBALL',
  Biathlon = 'BIATHLON',
  Cs = 'CS',
  Dota2 = 'DOTA2',
  Football = 'FOOTBALL',
  Hockey = 'HOCKEY',
  Main = 'MAIN',
  Tennis = 'TENNIS'
}

/** Типы этапов */
export enum StageType {
  /** Групповой этап */
  GroupStage = 'GROUP_STAGE',
  /** Плей-офф */
  PlayoffStage = 'PLAYOFF_STAGE',
  /** Квалификация */
  QualificationStage = 'QUALIFICATION_STAGE',
  /** Стандартный */
  RegularStage = 'REGULAR_STAGE'
}

/** Типы достижений */
export enum StatAchievementList {
  /** Лучший ассистент */
  TopAssist = 'TOP_ASSIST',
  /** Лучший бомбардир */
  TopScorer = 'TOP_SCORER',
  /** Частый нарушитель */
  ToughGuy = 'TOUGH_GUY'
}

export enum StatBettingFactoidSide {
  Away = 'AWAY',
  Both = 'BOTH',
  Home = 'HOME',
  Unknown = 'UNKNOWN'
}

/** Типы фактоидов ставок */
export enum StatBettingFactoidType {
  IndividualTotal = 'INDIVIDUAL_TOTAL',
  Outcome = 'OUTCOME',
  UnknownBettingFactoidType = 'UNKNOWN_BETTING_FACTOID_TYPE'
}

/**
 * # Виды идентификаторов для стран
 *
 *   О стандарте ISO 3166
 *   [https://www.iso.org/iso-3166-country-codes.html](https://www.iso.org/iso-3166-country-codes.html)
 *   [https://en.wikipedia.org/wiki/ISO_3166-1](https://en.wikipedia.org/wiki/ISO_3166-1)
 */
export enum StatCountryIdList {
  /** ISO alpha-3 code (неполное соответствие ISO 3166) */
  Code = 'CODE',
  /** ISO alpha-2 code */
  Iso2 = 'ISO2'
}

/** Причины получения карт */
export enum StatEnumCardReason {
  Argument = 'ARGUMENT',
  DangerousPlay = 'DANGEROUS_PLAY',
  Dissent = 'DISSENT',
  Encroachment = 'ENCROACHMENT',
  EnteringFieldOfPlay = 'ENTERING_FIELD_OF_PLAY',
  EnteringRefereeReviewArea = 'ENTERING_REFEREE_REVIEW_AREA',
  EnteringVideoOperationsRoom = 'ENTERING_VIDEO_OPERATIONS_ROOM',
  ExcessiveCelebration = 'EXCESSIVE_CELEBRATION',
  ExcessiveUsageOfReviewSignal = 'EXCESSIVE_USAGE_OF_REVIEW_SIGNAL',
  Foul = 'FOUL',
  FoulAndAbusiveLanguage = 'FOUL_AND_ABUSIVE_LANGUAGE',
  HandBall = 'HAND_BALL',
  LeavingFieldOfPlay = 'LEAVING_FIELD_OF_PLAY',
  NotRetreating = 'NOT_RETREATING',
  NotSet = 'NOT_SET',
  OffTheBallFoul = 'OFF_THE_BALL_FOUL',
  OtherReason = 'OTHER_REASON',
  PersistentInfringement = 'PERSISTENT_INFRINGEMENT',
  ProfessionalFoul = 'PROFESSIONAL_FOUL',
  SeriousFoul = 'SERIOUS_FOUL',
  Simulation = 'SIMULATION',
  Spitting = 'SPITTING',
  TimeWasting = 'TIME_WASTING',
  ViolentConduct = 'VIOLENT_CONDUCT'
}

/** Типы статистики по команде */
export enum StatEnumTeamStatsType {
  BallPossession = 'BALL_POSSESSION',
  ChangeCount = 'CHANGE_COUNT',
  CornerKicks = 'CORNER_KICKS',
  Fouls = 'FOULS',
  FreeKicks = 'FREE_KICKS',
  GoalKicks = 'GOAL_KICKS',
  Offsides = 'OFFSIDES',
  OwnGoals = 'OWN_GOALS',
  PenaltiesMissed = 'PENALTIES_MISSED',
  PenaltyScored = 'PENALTY_SCORED',
  RedCards = 'RED_CARDS',
  ShotsBlocked = 'SHOTS_BLOCKED',
  ShotsOffTarget = 'SHOTS_OFF_TARGET',
  ShotsOnTarget = 'SHOTS_ON_TARGET',
  ShotsSaved = 'SHOTS_SAVED',
  ShotsTotal = 'SHOTS_TOTAL',
  Substitutions = 'SUBSTITUTIONS',
  ThrowIns = 'THROW_INS',
  YellowCards = 'YELLOW_CARDS',
  YellowRedCards = 'YELLOW_RED_CARDS'
}

/** Типы событий */
export enum StatEnumTypeTimeline {
  BeforeStarted = 'BEFORE_STARTED',
  BreakStart = 'BREAK_START',
  CancelledVideoAssistantReferee = 'CANCELLED_VIDEO_ASSISTANT_REFEREE',
  ChangeCount = 'CHANGE_COUNT',
  CornerKick = 'CORNER_KICK',
  DeleteRedCard = 'DELETE_RED_CARD',
  DeleteScoreChange = 'DELETE_SCORE_CHANGE',
  DeleteYellowCard = 'DELETE_YELLOW_CARD',
  DeleteYellowRedCard = 'DELETE_YELLOW_RED_CARD',
  FreeKick = 'FREE_KICK',
  GoalKick = 'GOAL_KICK',
  Injury = 'INJURY',
  InjuryReturn = 'INJURY_RETURN',
  InjuryTimeShown = 'INJURY_TIME_SHOWN',
  LineOneXTwo = 'LINE_ONE_X_TWO',
  MatchEnded = 'MATCH_ENDED',
  MatchLineup = 'MATCH_LINEUP',
  MatchStarted = 'MATCH_STARTED',
  Offside = 'OFFSIDE',
  PenaltyAwarded = 'PENALTY_AWARDED',
  PenaltyMissed = 'PENALTY_MISSED',
  PenaltySaved = 'PENALTY_SAVED',
  PenaltyShootout = 'PENALTY_SHOOTOUT',
  PeriodScore = 'PERIOD_SCORE',
  PeriodStart = 'PERIOD_START',
  PossibleVideoAssistantReferee = 'POSSIBLE_VIDEO_ASSISTANT_REFEREE',
  RedCard = 'RED_CARD',
  ScoreChange = 'SCORE_CHANGE',
  ShotOffTarget = 'SHOT_OFF_TARGET',
  ShotOnTarget = 'SHOT_ON_TARGET',
  ShotSaved = 'SHOT_SAVED',
  Substitution = 'SUBSTITUTION',
  TeamStatsChange = 'TEAM_STATS_CHANGE',
  ThrowIn = 'THROW_IN',
  UpdateCurrentTime = 'UPDATE_CURRENT_TIME',
  UpdateRedCard = 'UPDATE_RED_CARD',
  UpdateScoreChange = 'UPDATE_SCORE_CHANGE',
  UpdateTeamStanding = 'UPDATE_TEAM_STANDING',
  UpdateYellowCard = 'UPDATE_YELLOW_CARD',
  UpdateYellowRedCard = 'UPDATE_YELLOW_RED_CARD',
  VarCardUpgrade = 'VAR_CARD_UPGRADE',
  /** @deprecated There is instead VAR_GOAL_AWARDED and VAR_GOAL_NOT_AWARDED */
  VarGoal = 'VAR_GOAL',
  VarGoalAwarded = 'VAR_GOAL_AWARDED',
  VarGoalNotAwarded = 'VAR_GOAL_NOT_AWARDED',
  VarMistakenIdentity = 'VAR_MISTAKEN_IDENTITY',
  /** @deprecated There is instead VAR_PENALTY_AWARDED and VAR_PENALTY_NOT_AWARDED */
  VarPenalty = 'VAR_PENALTY',
  VarPenaltyAwarded = 'VAR_PENALTY_AWARDED',
  VarPenaltyNotAwarded = 'VAR_PENALTY_NOT_AWARDED',
  VarRedCardGiven = 'VAR_RED_CARD_GIVEN',
  VarUnknown = 'VAR_UNKNOWN',
  VideoAssistantReferee = 'VIDEO_ASSISTANT_REFEREE',
  VideoAssistantRefereeOver = 'VIDEO_ASSISTANT_REFEREE_OVER',
  Xg = 'XG',
  YellowCard = 'YELLOW_CARD',
  YellowRedCard = 'YELLOW_RED_CARD'
}

export type StatHead2HeadInput = {
  pageNum: Scalars['Int']['input'];
  pageSize: Scalars['Int']['input'];
  teamID?: InputMaybe<Scalars['String']['input']>;
};

/** Типы фактоидов ставок */
export enum StatHockeyBettingFactoidType {
  IndividualTotal = 'INDIVIDUAL_TOTAL',
  Outcome = 'OUTCOME',
  UnknownBettingFactoidType = 'UNKNOWN_BETTING_FACTOID_TYPE'
}

export enum StatHockeySeriesWinner {
  Draw = 'DRAW',
  Team1 = 'TEAM1',
  Team2 = 'TEAM2'
}

/** Типы периодов */
export enum StatHockeyTypePeriodScore {
  Overtime = 'OVERTIME',
  Period1 = 'PERIOD1',
  Period2 = 'PERIOD2',
  Period3 = 'PERIOD3',
  Shootout = 'SHOOTOUT',
  Total = 'TOTAL'
}

export enum StatInjuryType {
  Ankle = 'ANKLE',
  Head = 'HEAD',
  Knee = 'KNEE',
  Knock = 'KNOCK',
  Muscle = 'MUSCLE',
  Neck = 'NECK',
  Poisoning = 'POISONING',
  Undefined = 'UNDEFINED',
  Virus = 'VIRUS'
}

export type StatInputRankingPlayerStat = {
  attribute?: InputMaybe<Array<StatRankingAttribute>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  source?: InputMaybe<StatSourceList>;
  teams?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type StatInputRankingPlayerStatWithPagination = {
  attribute: StatRankingAttribute;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sort?: InputMaybe<StatSortPlayerStat>;
  source?: InputMaybe<StatSourceList>;
  teams?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type StatInputRankingTeamStat = {
  attribute?: InputMaybe<Array<StatRankingTeamAttribute>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
};

/** Сортировки в пагинации */
export enum StatListSort {
  /** Возрастание */
  Asc = 'ASC',
  /** Убывание */
  Desc = 'DESC'
}

/** Виды идентификаторов */
export enum StatMlMatchPredictionSort {
  /** По голам */
  Goals = 'GOALS',
  /** Зрелищности */
  Spectacularity = 'SPECTACULARITY',
  /** По желтым карточкам */
  YellowCards = 'YELLOW_CARDS'
}

/** Сортировки в пагинации */
export enum StatMatchListSort {
  /** Возрастание */
  Asc = 'ASC',
  /** сортировка по возрастанию по началу матча */
  AscScheduledAt = 'ASC_SCHEDULED_AT',
  /** Убывание */
  Desc = 'DESC',
  /** сортировка по убыванию по началу матча */
  DescScheduledAt = 'DESC_SCHEDULED_AT'
}

/** Состояние матча */
export enum StatMatchStatus {
  Live = 'LIVE',
  NotStarted = 'NOT_STARTED'
}

export enum StatMatchStatusSort {
  Live = 'LIVE',
  Next = 'NEXT',
  Prev = 'PREV',
  PrevWithoutLive = 'PREV_WITHOUT_LIVE'
}

/** Метод гола */
export enum StatMethodScore {
  None = 'NONE',
  OwnGoal = 'OWN_GOAL',
  Penalty = 'PENALTY'
}

/** Члены команды */
export enum StatOccupationList {
  /** Менеджер (тренер) */
  Manager = 'MANAGER',
  /** Игроки */
  Player = 'PLAYER'
}

/** Типы результата для ставки Исход */
export enum StatOddOneXTwoResultType {
  Away = 'AWAY',
  Draw = 'DRAW',
  Home = 'HOME'
}

/** Виды промаха */
export enum StatOutcome {
  /** Перекладина */
  Bar = 'BAR',
  /** Мимо */
  Miss = 'MISS',
  /** Штанга */
  Post = 'POST'
}

/** Статус пенальти */
export enum StatPenaltyShootoutStatus {
  /** Не реализован */
  Missed = 'MISSED',
  /** Ещё не пробит */
  NotTakenYet = 'NOT_TAKEN_YET',
  /** Реализован */
  Scored = 'SCORED'
}

/** Период */
export enum StatPeriodId {
  /** Конец дополнительного времени перед серией пенальти */
  EndOfExtraTimeBeforePenalties = 'END_OF_EXTRA_TIME_BEFORE_PENALTIES',
  /** Конец второго тайма перед дополнительным временем */
  EndOfSecondHalfBeforeExtraTime = 'END_OF_SECOND_HALF_BEFORE_EXTRA_TIME',
  /** Первый тайм дополнительного времени */
  ExtraTimeFirstHalf = 'EXTRA_TIME_FIRST_HALF',
  /** Перерыв между таймами в дополнительное время */
  ExtraTimeHalfTime = 'EXTRA_TIME_HALF_TIME',
  /** Второй тайм дополнительного времени */
  ExtraTimeSecondHalf = 'EXTRA_TIME_SECOND_HALF',
  /** Первый тайм */
  FirstHalf = 'FIRST_HALF',
  /** Матч окончен */
  FullTime = 'FULL_TIME',
  /** Перерыв */
  HalfTime = 'HALF_TIME',
  /** Серия пенальти */
  PenaltyShootout = 'PENALTY_SHOOTOUT',
  /** До матча */
  PreMatch = 'PRE_MATCH',
  /** Второй тайм */
  SecondHalf = 'SECOND_HALF'
}

/** Сортировки в статистике */
export enum StatPlayerStatSort {
  /** Ассистенты (по передачам) */
  Assist = 'ASSIST',
  /** Сыгранные матчи */
  MatchPlayed = 'MATCH_PLAYED',
  /** По красным карточкам */
  RedCards = 'RED_CARDS',
  /** Бомбардиры (по голам) */
  Score = 'SCORE',
  /** По желтым карточкам */
  YellowCards = 'YELLOW_CARDS'
}

/** Виды продуктов */
export enum StatProduct {
  /** Международные проекты */
  International = 'INTERNATIONAL',
  /** Sports.ru */
  Sports = 'SPORTS'
}

/** Команда */
export enum StatQualifierTeam {
  /** Гостевая */
  Away = 'AWAY',
  /** Домашняя */
  Home = 'HOME'
}

/** Позиции игроков */
export enum StatRadarPositionPlayer {
  /** Центральный защитник */
  CentralDefender = 'CENTRAL_DEFENDER',
  /** Центральный полузащитник */
  CentralMidfielder = 'CENTRAL_MIDFIELDER',
  /** Вратарь */
  Goalkeeper = 'GOALKEEPER',
  /** Левый защитник */
  LeftBack = 'LEFT_BACK',
  /** Левый полузащитник */
  LeftWinger = 'LEFT_WINGER',
  /** Правый защитник */
  RightBack = 'RIGHT_BACK',
  /** Правый полузащитник */
  RightWinger = 'RIGHT_WINGER',
  /** Нападающий */
  Striker = 'STRIKER'
}

export enum StatRankingAttribute {
  /** Точность передач */
  AccuratePassesPct = 'ACCURATE_PASSES_PCT',
  /** сухих матчей для вратарей */
  CleanSheetGk = 'CLEAN_SHEET_GK',
  GoalsAndAssists = 'GOALS_AND_ASSISTS',
  /** Перехваты за игру */
  InterceptionsPerGame = 'INTERCEPTIONS_PER_GAME',
  /** Минут для ассиста */
  MinutesPlayedPerAssist = 'MINUTES_PLAYED_PER_ASSIST',
  /** Минут до пропущенного мяча(только для вратарей) */
  MinutesPlayedPerConceded = 'MINUTES_PLAYED_PER_CONCEDED',
  /** Минут для 1 фола */
  MinutesPlayedPerFoul = 'MINUTES_PLAYED_PER_FOUL',
  /** Минут на гол */
  MinutesPlayedPerGoal = 'MINUTES_PLAYED_PER_GOAL',
  /** Ударов в створ за игру */
  OntargetAttemptsPerGame = 'ONTARGET_ATTEMPTS_PER_GAME',
  /** забитых пенальти с игры */
  PenaltyScored = 'PENALTY_SCORED',
  /** Сэйвы за игру */
  SavesPerGame = 'SAVES_PER_GAME',
  TotalAssists = 'TOTAL_ASSISTS',
  /** Количество фолов */
  TotalFouls = 'TOTAL_FOULS',
  TotalGoals = 'TOTAL_GOALS',
  TotalGoalsConceded = 'TOTAL_GOALS_CONCEDED',
  /** Пропущенные мячи, только для вратарей */
  TotalGoalsConcededForGk = 'TOTAL_GOALS_CONCEDED_FOR_GK',
  /** Количество сыгранных минут */
  TotalMinsPlayed = 'TOTAL_MINS_PLAYED',
  TotalRedCard = 'TOTAL_RED_CARD',
  TotalYellowCard = 'TOTAL_YELLOW_CARD',
  /** Количество желтых карточек + (Количество красных карточек x2) */
  ToughGuy = 'TOUGH_GUY',
  /** Успешный дриблинг за игру */
  WonContestsPerGame = 'WON_CONTESTS_PER_GAME',
  /** Отборы за игру */
  WonTacklesPerGame = 'WON_TACKLES_PER_GAME'
}

export enum StatRankingTeamAttribute {
  /** Ударов за игру */
  AttemptsPerGame = 'ATTEMPTS_PER_GAME',
  /** Ударов для гола */
  AttemptsPerGoal = 'ATTEMPTS_PER_GOAL',
  /** Сыгранные матчи */
  MatchPlayed = 'MATCH_PLAYED',
  /** Дуэлей выиграно */
  TotalDuelsWon = 'TOTAL_DUELS_WON',
  /** Всего голов */
  TotalGoals = 'TOTAL_GOALS',
  /** Процент удачных передач */
  TotalPassPct = 'TOTAL_PASS_PCT',
  /** Количество красных карточек */
  TotalRedCard = 'TOTAL_RED_CARD',
  /** Процент удачных отборов */
  TotalTacklePct = 'TOTAL_TACKLE_PCT',
  /** Количество желтых карточек */
  TotalYellowCard = 'TOTAL_YELLOW_CARD',
  /** Количество желтых карточек + (Количество красных карточек x2) */
  ToughTeam = 'TOUGH_TEAM'
}

/** Тип судьи */
export enum StatRefereeRole {
  /** Fourth Official (Fourth Official / Substitute Referee) */
  FourthOfficial = 'FOURTH_OFFICIAL',
  /** Lineman 1 / AR1 – Senior Assistant Referee */
  Linesman_1 = 'LINESMAN_1',
  /** Assistant Referee 2 (Lineman 2 / AR2 – Junior Assistant Referee) */
  Linesman_2 = 'LINESMAN_2',
  /** Main Referee */
  Main = 'MAIN',
  /** VAR */
  Var = 'VAR',
  /** VAR assistant official */
  VarAssistant = 'VAR_ASSISTANT'
}

/** Результат */
export enum StatResult {
  /** Ничья */
  Draw = 'DRAW',
  /** Поражение */
  Lose = 'LOSE',
  /** Победа */
  Win = 'WIN'
}

export enum StatSortPlayerStat {
  Asc = 'ASC',
  Default = 'DEFAULT',
  Desc = 'DESC'
}

/** Виды идентификаторов */
export enum StatSourceList {
  /** Глобальный */
  Global = 'GLOBAL',
  /** OMNI */
  Omni = 'OMNI',
  /** Opta */
  Opta = 'OPTA',
  /** Perform */
  Perform = 'PERFORM',
  /** Sportradar */
  Sportradar = 'SPORTRADAR',
  /** ID на [Sports.ru](https://sports.ru) */
  Sports = 'SPORTS',
  /** Название хаба на [Sports.ru](https://sports.ru) */
  SportsHub = 'SPORTS_HUB',
  /** ID тега на [Sports.ru](https://sports.ru) */
  SportsTag = 'SPORTS_TAG',
  /** Tag */
  Tag = 'TAG',
  /** Хабы [Tribuna.com](https://tribuna.com) */
  TribunaHub = 'TRIBUNA_HUB'
}

export enum StatSuspensionType {
  Disqualification = 'DISQUALIFICATION',
  PlayForTheNationalTeam = 'PLAY_FOR_THE_NATIONAL_TEAM'
}

/** Сортировки в статистике по командам */
export enum StatTeamStatSort {
  /** Сыгранные матчи */
  MatchPlayed = 'MATCH_PLAYED',
  /** Количество передач */
  TotalAssists = 'TOTAL_ASSISTS',
  /** Дуэлей выиграно */
  TotalDuelsWon = 'TOTAL_DUELS_WON',
  /** Всего голов */
  TotalGoals = 'TOTAL_GOALS',
  /** Процент удачных передач */
  TotalPassPct = 'TOTAL_PASS_PCT',
  /** Количество красных карточек */
  TotalRedCard = 'TOTAL_RED_CARD',
  /** Процент удачных отборов */
  TotalTacklePct = 'TOTAL_TACKLE_PCT',
  /** Количество желтых карточек */
  TotalYellowCard = 'TOTAL_YELLOW_CARD'
}

/** Типы фактоидов ставок */
export enum StatTennisBettingFactoidType {
  Outcome = 'OUTCOME',
  UnknownBettingFactoidType = 'UNKNOWN_BETTING_FACTOID_TYPE'
}

/** Фильтр для стат */
export type StatTournamentPopularFilter = {
  /** Фильтр по гео */
  geo_code?: InputMaybe<GeoCodePopular>;
};

/** Раунды для статистики */
export type StatTournamentRoundInput = {
  /** Группы (A, B, ...) */
  groups?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Номера туров */
  numbers?: InputMaybe<Array<Scalars['Int']['input']>>;
  /** Фазы для групповых этапов (group_phase_1) */
  phases?: InputMaybe<Array<Scalars['String']['input']>>;
  /** Фильтр по названию раунда */
  roundTypeName?: InputMaybe<Scalars['String']['input']>;
  /** Этапы (group, cup) */
  types?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type StatTransfersInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  startDateAt: Scalars['String']['input'];
};

/** Типы периодов */
export enum StatTypePeriodScore {
  /** Дополнительное время */
  Overtime = 'OVERTIME',
  /** Серия пенальти */
  Penalties = 'PENALTIES',
  /** Основное время */
  RegularPeriod = 'REGULAR_PERIOD'
}

/** Типы позиций */
export enum StatTypePlayer {
  /** Защитник */
  Defender = 'DEFENDER',
  /** Нападающий */
  Forward = 'FORWARD',
  /** Вратарь */
  Goalkeeper = 'GOALKEEPER',
  /** Полузащитник */
  Midfielder = 'MIDFIELDER'
}

/** Решение по VAR */
export enum StatVarDecision {
  Cancelled = 'CANCELLED',
  Confirmed = 'CONFIRMED'
}

/** Победитель */
export enum StatWinner {
  /** Гостевая команда */
  Away = 'AWAY',
  /** Ничья */
  Draw = 'DRAW',
  /** Домашняя команда */
  Home = 'HOME'
}

/** Форматы картинок */
export enum TeamImageFormat {
  /** Форма */
  Kit = 'KIT',
  /** PNG/JPG логотип */
  Logo = 'LOGO',
  /** SVG-логотип */
  Svg = 'SVG'
}

export enum TennisCourtType {
  Carpet = 'CARPET',
  Clay = 'CLAY',
  Grass = 'GRASS',
  Hard = 'HARD',
  Unspecified = 'UNSPECIFIED'
}

export type TennisEventFilter = {
  lastGame?: InputMaybe<Scalars['Boolean']['input']>;
};

export enum TennisGender {
  Men = 'MEN',
  Mixed = 'MIXED',
  Unspecified = 'UNSPECIFIED',
  Women = 'WOMEN'
}

export enum TennisMatchFormat {
  Double = 'DOUBLE',
  Single = 'SINGLE',
  Unspecified = 'UNSPECIFIED'
}

export enum TennisMatchStatus {
  Awarded = 'AWARDED',
  Bye = 'BYE',
  Cancelled = 'CANCELLED',
  Fixture = 'FIXTURE',
  Played = 'PLAYED',
  Playing = 'PLAYING',
  Postponed = 'POSTPONED',
  Retired = 'RETIRED',
  Suspended = 'SUSPENDED',
  Unspecified = 'UNSPECIFIED',
  Walkover = 'WALKOVER'
}

/** Параметры для запроса матчи за день */
export type TennisMatchesByDateFilter = {
  /** Фильтр по списку турниров */
  competitionIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  /** День в формате *yyyy-mm-dd* */
  date: Scalars['String']['input'];
  /** Длина дня */
  dayLength?: InputMaybe<Scalars['String']['input']>;
  source?: InputMaybe<StatSourceList>;
  /** Фильтр по статусам матча */
  status?: InputMaybe<Array<MatchStatus>>;
  /** Часовой пояс в формате *±hh:mm* */
  timezone?: InputMaybe<Scalars['String']['input']>;
};

export enum TennisPeriod {
  Finished = 'FINISHED',
  NotStarted = 'NOT_STARTED',
  Set1 = 'SET1',
  Set2 = 'SET2',
  Set3 = 'SET3',
  Set4 = 'SET4',
  Set5 = 'SET5',
  SetBreak = 'SET_BREAK'
}

export type TennisRankingCountryListInput = {
  /** Тип турнира */
  rankingType?: InputMaybe<TennisTournamentType>;
  /** Тур */
  tourID: Scalars['String']['input'];
  /** Год */
  tourYear?: InputMaybe<Scalars['Int']['input']>;
};

export type TennisRankingInput = {
  /** Фильтр по стране */
  countryID?: InputMaybe<Scalars['String']['input']>;
  /** Курсор */
  cursorPosition?: InputMaybe<Scalars['Int']['input']>;
  /** Лимит */
  limit?: InputMaybe<Scalars['Int']['input']>;
  /** Тип турнира */
  rankingType?: InputMaybe<TennisTournamentType>;
  /** Сортировка */
  sort?: InputMaybe<TennisRankingSortType>;
  /** Тур */
  tourID: Scalars['String']['input'];
  /** Год */
  tourYear?: InputMaybe<Scalars['Int']['input']>;
};

export enum TennisRankingSortType {
  AgeAsc = 'AGE_ASC',
  AgeDesc = 'AGE_DESC',
  CountryAsc = 'COUNTRY_ASC',
  CountryDesc = 'COUNTRY_DESC',
  PointsAsc = 'POINTS_ASC',
  PointsDesc = 'POINTS_DESC',
  PositionAsc = 'POSITION_ASC',
  PositionDesc = 'POSITION_DESC',
  TournamentsAsc = 'TOURNAMENTS_ASC',
  TournamentsDesc = 'TOURNAMENTS_DESC'
}

export enum TennisScoreType {
  Set1 = 'SET1',
  Set2 = 'SET2',
  Set3 = 'SET3',
  Set4 = 'SET4',
  Set5 = 'SET5',
  Total = 'TOTAL',
  Unspecified = 'UNSPECIFIED'
}

export type TennisSearchInput = {
  /** Текст запроса */
  search: Scalars['String']['input'];
  /** Искомые типы */
  type: Array<TennisSearchType>;
};

/** Типы сущностей */
export enum TennisSearchType {
  /** COMPETITION */
  TennisCompetition = 'TENNIS_COMPETITION',
  /** Игрок */
  TennisPerson = 'TENNIS_PERSON'
}

export enum TennisSide {
  A = 'A',
  B = 'B'
}

export enum TennisSportType {
  /** сортировка по возрастанию по началу матча */
  AscScheduledAt = 'ASC_SCHEDULED_AT',
  /** сортировка по убыванию по началу матча */
  DescScheduledAt = 'DESC_SCHEDULED_AT'
}

export enum TennisStatType {
  Counter = 'COUNTER',
  Fraction = 'FRACTION',
  FractionP = 'FRACTION_P',
  Percent = 'PERCENT'
}

/** Запрос на тизер по теннисным матчам */
export type TennisTeaserInput = {
  limit: Scalars['Int']['input'];
  sort: TennisSportType;
  status?: InputMaybe<Array<TennisMatchStatus>>;
  tourCalendarIds?: InputMaybe<Array<Scalars['ID']['input']>>;
  tournamentIds?: InputMaybe<Array<Scalars['ID']['input']>>;
};

export enum TennisTournamentMatchFormat {
  Double = 'DOUBLE',
  Mix = 'MIX',
  NationalTeam = 'NATIONAL_TEAM',
  Single = 'SINGLE',
  Unspecified = 'UNSPECIFIED'
}

export enum TennisTournamentStatus {
  Break = 'BREAK',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Delayed = 'DELAYED',
  InProgress = 'IN_PROGRESS',
  Postponed = 'POSTPONED',
  Scheduled = 'SCHEDULED',
  Suspended = 'SUSPENDED',
  Unspecified = 'UNSPECIFIED'
}

export enum TennisTournamentType {
  Doubles = 'DOUBLES',
  Singles = 'SINGLES'
}

export enum TourMatchesSort {
  Spectacularity = 'SPECTACULARITY'
}

/** Форматы изображений турнира */
export enum TournamentImageFormat {
  Background = 'BACKGROUND',
  Logo = 'LOGO',
  Svg = 'SVG'
}

/** Типы периодов */
export enum TransferType {
  BackFromLoan = 'BACK_FROM_LOAN',
  FreeAgent = 'FREE_AGENT',
  FreeTransfer = 'FREE_TRANSFER',
  Loan = 'LOAN',
  PlayerSwap = 'PLAYER_SWAP',
  Transfer = 'TRANSFER',
  Trial = 'TRIAL',
  Unknown = 'UNKNOWN'
}

export type UpdateContentStatusInput = {
  contentID?: InputMaybe<Scalars['String']['input']>;
  locale: Scalars['String']['input'];
  statusCurrent: ComplaintContentStatus;
  statusNew: ComplaintContentStatus;
  userID?: InputMaybe<Scalars['String']['input']>;
};

export enum UserBanCause {
  /**  Оскорбление  */
  Insult = 'INSULT',
  /**  Мульти-аккаунтинг  */
  MultiAccounting = 'MULTI_ACCOUNTING',
  /**  Прочее  */
  Other = 'OTHER',
  /**  Провокации  */
  Provocations = 'PROVOCATIONS',
  /**  Расизм  */
  Racism = 'RACISM',
  /**  Спам  */
  Spam = 'SPAM',
  /**  Мат  */
  Swears = 'SWEARS',
  /**  Систематический оффтом  */
  SystematicOfftop = 'SYSTEMATIC_OFFTOP',
  /**  Угрозы  */
  Threats = 'THREATS'
}

export enum UserSex {
  Female = 'FEMALE',
  Male = 'MALE',
  NotSelected = 'NOT_SELECTED'
}

export enum UserType {
  /**  Сотрудник sports.ru  */
  SportsEmployee = 'SPORTS_EMPLOYEE',
  /**  Неизвестный  */
  Undefined = 'UNDEFINED',
  /**  Подтвержденный  */
  Verified = 'VERIFIED'
}

export type UsersWithRulesFilter = {
  email?: InputMaybe<Scalars['String']['input']>;
  nick?: InputMaybe<Scalars['String']['input']>;
  rules?: InputMaybe<Array<UserRule>>;
  userID?: InputMaybe<Scalars['ID']['input']>;
};

export enum VideoContentListSort {
  PublicAsc = 'PUBLIC_ASC',
  PublicDesc = 'PUBLIC_DESC'
}

export enum VideoContentSize {
  Original = 'ORIGINAL',
  Size_640x480 = 'SIZE_640x480'
}

export enum VideoContentType {
  Broadcast = 'BROADCAST',
  Goals = 'GOALS',
  Highlight = 'HIGHLIGHT',
  Interview = 'INTERVIEW',
  Other = 'OTHER',
  VideoReview = 'VIDEO_REVIEW'
}

export type VideoInputCollection = {
  ISO2?: InputMaybe<Scalars['String']['input']>;
  source?: InputMaybe<VideoSource>;
  sports?: InputMaybe<Array<VideoSport>>;
  videoType?: InputMaybe<Array<VideoContentType>>;
};

export type VideoInputLink = {
  autostart?: InputMaybe<Scalars['Boolean']['input']>;
  height?: Scalars['Int']['input'];
  muted?: InputMaybe<Scalars['Boolean']['input']>;
  width?: Scalars['Int']['input'];
};

export type VideoInputMatch = {
  ISO2?: InputMaybe<Scalars['String']['input']>;
  autostart?: InputMaybe<Scalars['Boolean']['input']>;
  muted?: InputMaybe<Scalars['Boolean']['input']>;
  videoSize?: InputMaybe<VideoContentSize>;
  videoType?: InputMaybe<Array<VideoContentType>>;
};

export type VideoInputPreview = {
  ext?: InputMaybe<PictureExtension>;
  resize?: InputMaybe<VideoPreviewSize>;
};

export type VideoInputTournament = {
  cursor?: InputMaybe<Scalars['ID']['input']>;
  limit: Scalars['Int']['input'];
  sort: VideoContentListSort;
  source: VideoSource;
  sport: VideoSport;
  videoType: VideoContentType;
};

export enum VideoPreviewSize {
  Original = 'ORIGINAL',
  Size_166x94 = 'SIZE_166x94',
  Size_332x198 = 'SIZE_332x198'
}

export enum VideoSource {
  Betboom = 'BETBOOM',
  Kinopoisk = 'KINOPOISK',
  Matchtv = 'MATCHTV',
  Okko = 'OKKO',
  Tv1 = 'TV1',
  Unknown = 'UNKNOWN',
  Webcaster = 'WEBCASTER',
  Winline = 'WINLINE',
  Youtube = 'YOUTUBE'
}

export enum VideoSport {
  Boxing = 'BOXING',
  Football = 'FOOTBALL',
  Hockey = 'HOCKEY',
  Mma = 'MMA',
  Tennis = 'TENNIS',
  Unknown = 'UNKNOWN'
}

export type TournamentQueryVariables = Exact<{
  source: FantasyIdSource;
  id: Scalars['ID']['input'];
}>;


export type TournamentQuery = { __typename?: 'Query', fantasyQueries: { __typename?: 'FantasyQueries', tournament?: { __typename?: 'FantasyTournament', metaTitle: string, id: string, currentSeason?: { __typename?: 'FantasySeason', id: string, isActive: boolean, statObject: { __typename?: 'statSeason', name: string, startDate: string, endDate: string, year: string } } | null } | null } };


export const TournamentDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Tournament"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"FantasyIDSource"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fantasyQueries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tournament"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"metaTitle"}},{"kind":"Field","name":{"kind":"Name","value":"currentSeason"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"isActive"}},{"kind":"Field","name":{"kind":"Name","value":"statObject"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"startDate"}},{"kind":"Field","name":{"kind":"Name","value":"endDate"}},{"kind":"Field","name":{"kind":"Name","value":"year"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<TournamentQuery, TournamentQueryVariables>;