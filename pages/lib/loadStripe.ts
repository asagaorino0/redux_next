import { loadStripe } from '@stripe/stripe-js';

// Stripeにクレカ情報をPOSTするためのライプラリ
const stripePromise = loadStripe(
    // process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    'pk_test_51JdlUwIeKRfM8LCelTFny3MzSaui9gqP0ZnZwB16Kv9AxVnLwr8UkugHmiaHV8wQyhbXiZnw7ozQE47SZH058Uss00l7jX4hKz'
);

export default stripePromise