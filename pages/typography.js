import Link from 'next/link';
import Image from 'next/image';
import Entry from '../layouts/Entry';
import Page from '../layouts/Page';
import Email from '../components/icons/Email';
import GitHub from '../components/icons/GitHub';
import Twitter from '../components/icons/Twitter';
import RSS from '../components/icons/RSS';
import Discord from '../components/icons/Discord';

export default function Home({ entries }) {
  return (
    <Page title="Typography">
      <p>
        This page is a demo page to test typography changes that I make to my
        styles. It serves no other purpose, but I made it live for fun.
      </p>
      <hr />
      <section className="typography">
        <h1>H1 Tag Here</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam quis
          nulla faucibus, fermentum elit nec, pulvinar nulla. Nam venenatis orci
          sit amet massa auctor, at ullamcorper sem luctus.
        </p>
        <hr />
        <p>
          Sed et purus vitae turpis ultrices fringilla. Quisque augue lacus,
          rhoncus in rutrum in, imperdiet non nunc. Suspendisse sed felis id
          turpis pharetra ultrices eget ut orci. Duis eros ex, efficitur ac
          venenatis ut, eleifend a metus. Duis aliquet leo quis lacinia
          pharetra.
        </p>
        <h2>H2 Tag Here</h2>
        <p>
          Ut pharetra finibus lectus eget euismod. Maecenas a odio nec ante
          consequat molestie. Aliquam commodo, lectus nec bibendum varius,
          ligula ligula commodo enim, quis euismod mi massa a sapien. Maecenas
          non mollis est. Nunc in risus in neque ornare eleifend vitae et quam.
          Nam suscipit id lorem sed iaculis. Suspendisse finibus, sem sed
          finibus fermentum, dolor orci elementum eros, nec mattis orci odio ut
          risus. Morbi venenatis nec lectus eget suscipit.
        </p>
        <ul>
          <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
          <li>Donec ut tortor id ex sagittis tempor.</li>
          <li>Sed mattis magna quis augue scelerisque porttitor.</li>
          <li>Vestibulum elementum risus et mi ornare sollicitudin.</li>
          <li>Maecenas dignissim dolor sit amet consectetur feugiat.</li>
        </ul>
        <h3>H3 Tag Here</h3>
        <blockquote>
          <p>
            I modify facts to such a degree that they resemble truth more than
            reality
          </p>
          <cite>
            Werner Herzog,{' '}
            <a href="https://twitter.com/SGJ72/status/1386093564925399043/photo/1">
              falsely attributing it to Andre Gide
            </a>
          </cite>
        </blockquote>
        <h4>H4 Tag Here</h4>
        <table>
          <thead>
            <tr>
              <th>Table Header</th>
              <th>Column Name</th>
              <th>Category Title</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Item Category</th>
              <td>Another Value</td>
              <td>Value just keeps going</td>
            </tr>
            <tr>
              <th>Item Category</th>
              <td>Another Value</td>
              <td>Value just keeps going</td>
            </tr>
            <tr>
              <th>Item Category</th>
              <td>Another Value</td>
              <td>Value just keeps going</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>Footer Category</th>
              <td>Footer Value</td>
              <td>Footer Summary</td>
            </tr>
          </tfoot>
        </table>
      </section>
    </Page>
  );
}
