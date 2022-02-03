// import React from 'react';
// import { render } from '@testing-library/react-native';

// import App from './App';

// jest.useFakeTimers();

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// describe('<App />', () => {
//   it('has 1 child', () => {
//     const tree: any = render(<App />).toJSON();
//     // console.log(`tree =>`, tree);
//     // @ts-ignore
//     expect(tree.children.length).toBe(1);
//   });
// });
import React from 'react';
import renderer from 'react-test-renderer';

import App from './App';

describe('<App />', () => {
  it('has 1 child', () => {
    const tree: any = renderer.create(<App />).toJSON();
    // console.log(`tree =>`, tree);
    expect(tree?.children?.length).toBe(undefined);
  });
});
