import { stripeClient } from '../utils/stripe';
import Products from './Products';

export default async function HomePage() {
  const phone = await stripeClient.products.retrieve(process.env.PHONE_ID!, {
    expand: ['default_price'],
  });

  const magazine = await stripeClient.products.retrieve(
    process.env.MAGAZINE_ID!,
    {
      expand: ['default_price'],
    },
  );

  return (
    <main>
      <Products magazine={{ ...magazine }} phone={{ ...phone }} />
    </main>
  );
}
