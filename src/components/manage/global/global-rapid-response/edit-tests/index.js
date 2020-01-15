import React from 'react'
import Header from './components/Header'
import MenuTabs from './components/Tabs'
import { get, patch } from 'utils/api'
import { Paper } from '@material-ui/core'

function EditTestsSettings(props) {
  console.log(props)
  const [test, setTest] = React.useState({})
  const [loading, setLoading] = React.useState(true)
  React.useEffect(() => {
    if (!props.location.state) {
      get(
        `/pitch/global/rapid-response/tests/${props.match.params.test_uuid}/`
      ).then(res => {
        setLoading(false)
        setTest(res.data)
      })
    } else {
      if (props.location.state.rrtest) {
        setTest(props.location.state.rrtest)
        setLoading(false)
      } else {
        get(
          `/pitch/global/rapid-response/tests/${props.match.params.test_uuid}/`
        ).then(res => {
          setLoading(false)
          setTest(res.data)
        })
      }
    }
  }, [])
  function handleUpdate(data) {
    setLoading(true)
    patch(
      `/pitch/global/rapid-response/tests/${props.match.params.test_uuid}/`,
      data
    ).then(res => {
      setLoading(false)
      setTest(res.data)
      console.log(res.data)
      props.history.push({
        pathname: `/manage/rapid-response-tests/global/edit/${props.match.params.test_uuid}/menu/`,
        state: {
          rrtest: res.data
        }
      })
    })
  }
  return (
    <div>
      <Header test={test} loading={loading} />
      <Paper
        style={{
          minHeight: 525
        }}
      >
        <MenuTabs
          test={test}
          loading={loading}
          props={props}
          handleUpdate={handleUpdate}
        />
      </Paper>
    </div>
  )
}
export default EditTestsSettings
