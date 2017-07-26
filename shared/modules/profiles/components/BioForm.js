import _ from 'lodash' // eslint-disable-line
import React, {PropTypes} from 'react'
import {reduxForm, Field} from 'redux-form'
import Checkboxes from '../../utils/components/Checkboxes'
import EditorButtons from '../../utils/components/EditorButtons'
import MarkdownInput from '../../utils/components/MarkdownInput'

@reduxForm({
  form: 'bio',
})
export default class BioForm extends React.Component {

  static propTypes = {
    lookingFors: PropTypes.array,
    onSubmit: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    renderButtons: PropTypes.func,
  }

  handleSubmit = data => {
    this.props.onSubmit(_.pick(data, 'bioMd', 'lookingFor_ids'))
  }

  render() {
    const {lookingFors, renderButtons, onCancel, handleSubmit} = this.props

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <Field
          name="bioMd"
          label="Bio"
          inputProps={{placeholder: `Hi, I'm...`}}
          component={MarkdownInput}
        />

        {lookingFors && <Checkboxes label="Looking for..." name="lookingFor_ids" items={lookingFors} />}

        {renderButtons ? renderButtons() : <EditorButtons onCancel={onCancel} />}

      </form>
    )
  }
}
