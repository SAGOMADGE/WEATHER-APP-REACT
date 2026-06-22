# ⛅ SagoWeather

Погодное приложение с текущей погодой и прогнозом на 7 дней. Поиск по городу, смена темы и языка.

**[→ Живое демо](http://weather-app-react-zy8p.vercel.app)**

---

![SagoWeather — тёмная тема](./screenshots/desktop-dark.png)

---

## Что умеет приложение

- Текущая погода по любому городу: температура, ощущаемая, ветер, давление, влажность, видимость, точка росы, УФ-индекс
- Прогноз на 7 дней с иконками погодных условий
- Смена иконки день/ночь — луна появляется если текущее время после заката или до рассвета
- Переключение языка RU/EN
- Тёмная и светлая тема
- Валидация поиска — город не может содержать цифры
- Кнопка "Повторить" при ошибке сети
- Адаптив от 250px до 1440px+

---

![SagoWeather — светлая тема](./screenshots/desktop-light.png)

---

## Технические решения

**Два параллельных API**
Приложение делает два запроса к разным источникам: OpenWeatherMap для текущей погоды и Open-Meteo для недельного прогноза. Координаты из первого ответа передаются в URL второго запроса.

**Слой трансформации данных**
Сырые ответы API сразу маппируются в типизированные объекты — `mapCurrentWeather` и `mapForecastData`. `App` никогда не работает с сырыми данными, только с готовыми `MappedWeather` и `ForecastDay[]`.

**Типизированные ошибки**
`WeatherError extends Error` с полем `code` — приложение различает `CITY_NOT_FOUND` и `NETWORK_ERROR` и показывает разные сообщения.

**Ручная i18n**
Переводы изолированы в `translations.ts` как `as const` объект. `Translations` тип выводится автоматически через `typeof translations`. Нет внешних зависимостей.

**WMO коды прогноза**
Open-Meteo возвращает числовые коды погоды по стандарту WMO. `interpretWmoCode` маппит их в типизированный `Conditions` union — те же иконки что и для текущей погоды.

---

![SagoWeather — мобильная версия](./screenshots/mobile.png)

---

## Стек

|                       |                      |
| --------------------- | -------------------- |
| React 18 + TypeScript | UI и типизация       |
| Vite                  | Сборка               |
| OpenWeatherMap API    | Текущая погода       |
| Open-Meteo API        | Прогноз на 7 дней    |
| Intl.DateTimeFormat   | Локализация дат      |
| Lucide React          | Иконка термометра    |
| CSS Custom Properties | Дизайн-система, темы |

---

## Запуск локально

```bash
git clone https://github.com/SAGOMADGE/WEATHER-APP-REACT
cd WEATHER-APP-REACT
npm install
```

Создай `.env` файл:

```
VITE_WEATHER_API_KEY=твой_ключ_от_openweathermap
```

```bash
npm run dev
```

Ключ можно получить бесплатно на [openweathermap.org](https://openweathermap.org/api)
