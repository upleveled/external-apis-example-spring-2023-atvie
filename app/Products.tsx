'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Stripe from 'stripe';

type Props = { phone: Stripe.Product; magazine: Stripe.Product };

export default function Products(props: Props) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);

  async function createSession(price: string, productQuantity?: number) {
    const response = await fetch('/api/sessions', {
      method: 'POST',
      body: JSON.stringify({
        price,
        quantity: productQuantity,
      }),
    });

    const data = await response.json();

    router.push(data.sessions.url);
  }

  return (
    <>
      <div>
        <h1>{props.phone.name}</h1>
        <Image
          src={props.phone.images[0] || ''}
          alt={`image of a ${props.phone.name}`}
          width="100"
          height="100"
        />
        <div>
          <input
            min={1}
            type="number"
            value={quantity.toString()}
            onChange={(event) => setQuantity(Number(event.currentTarget.value))}
          />

          <button
            onClick={() =>
              createSession(
                (props.phone.default_price as Stripe.Price).id,
                quantity,
              )
            }
          >
            buy for €{' '}
            {((props.phone.default_price as Stripe.Price).unit_amount! / 100) *
              quantity}
          </button>
        </div>
      </div>
      <div>
        <h1>{props.magazine.name}</h1>
        <Image
          src={props.magazine.images[0] || ''}
          alt={`image of a ${props.magazine.name}`}
          width="100"
          height="100"
        />
        <div>
          <button
            onClick={() =>
              createSession((props.magazine.default_price as Stripe.Price).id)
            }
          >
            buy for €
            {(props.magazine.default_price as Stripe.Price).unit_amount! / 100}{' '}
            month
          </button>
        </div>
      </div>
    </>
  );
}
