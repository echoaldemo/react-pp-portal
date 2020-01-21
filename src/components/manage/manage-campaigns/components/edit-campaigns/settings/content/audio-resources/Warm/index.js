import React from 'react'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import { Select } from './components'
const WarmContainer = styled.div`
  width: 100%;
`

const Text = styled(Typography)`
  font-size: 16px !important;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #444851;
`

// const PrePlay = styled.div`
//   display: flex;
//   flex-direction: row;
//   cursor: pointer;
// `;

// const Link = styled(Text)`
//   text-decoration: underline;
//   font-size: 14px !important;
//   font-weight: normal;
//   font-stretch: normal;
//   font-style: normal;
//   line-height: normal;
//   letter-spacing: normal;
//   color: #444851;
// `;

const PlayContainer = styled.div`
  width: 48%;
  height: max-content;
  margin-bottom: 27px;
`

const PlayerList = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`

// const LineBreak = styled.div`
//   flex-basis: 100%;
//   height: 0;
// `;

const Warm = props => {
  // const [activeKey, setActiveKey] = useState([]);

  const layout_data = [
    {
      uuid: '1',
      label: 'Warm xfer greet long',
      selection: [
        {
          uuid: '1',
          name: 'Demo Music On Hold',
          src: 'http://www.pachd.com/sfx/city-park-ambience-1.mp3'
        },
        {
          uuid: '2',
          name: 'Warm xfer press cam',
          src: 'http://www.pachd.com/sfx/boiling_soup.wav'
        }
      ]
    },
    {
      uuid: '2',
      label: 'Warm xfer exit sound',
      selection: [
        {
          uuid: '1',
          name: 'Warm exfer press cam',
          src: 'http://www.pachd.com/sfx/city-park-ambience-1.mp3'
        }
      ]
    },
    {
      uuid: '3',
      label: 'Warm xfer greet short',
      selection: [
        {
          uuid: '1',
          name: 'Demo IVR invalid',
          src: 'http://www.pachd.com/sfx/city-park-ambience-1.mp3'
        }
      ]
    },
    {
      uuid: '4',
      label: 'Warm xfer press',
      selection: [
        {
          uuid: '1',
          name: 'Silence',
          src: 'http://www.pachd.com/sfx/city-park-ambience-1.mp3'
        }
      ]
    },
    {
      uuid: '5',
      label: 'Warm xfer invalid sound',
      selection: [
        {
          uuid: '1',
          name: 'Demo IVR exit',
          src: 'http://www.pachd.com/sfx/city-park-ambience-1.mp3'
        }
      ]
    },
    {
      uuid: '6',
      label: 'Warm xfer explained',
      selection: [
        {
          uuid: '1',
          name: 'Chelsea CB',
          src: 'http://www.pachd.com/sfx/city-park-ambience-1.mp3'
        }
      ]
    }
  ]

  return (
    <WarmContainer>
      <Text
        style={{
          marginTop: '26px',
          marginBottom: '32px'
        }}
      >
        To add or edit audio resources click{' '}
        <span
          style={{
            color: '#1194f6'
          }}
        >
          Edit resources
        </span>
      </Text>
      <PlayerList>
        {layout_data.map((key, i) => (
          <PlayContainer key={i}>
            <Select data={key} />
          </PlayContainer>
        ))}
      </PlayerList>
    </WarmContainer>
  )
}

export default Warm
