/* globals describe, it, expect */
import React from 'react'
import renderer from 'react-test-renderer'

import PageSpinner from './PageSpinner.js'

describe('PageSpinner (Snapshot)', () => {
  it('PageSpinner renders without crashing', () => {
    const component = renderer.create(<PageSpinner show={true} />)
    const json = component.toJSON()
    expect(json).toMatchSnapshot()
  })
})
