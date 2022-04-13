import React from 'react'

import { IoMdQrScanner, IoMdEye, IoMdEyeOff } from 'react-icons/io'
import styled from 'styled-components'

import ADD_LAYER_ICON from 'assets/images/add_layer_icon.svg'
import { useLayerList } from 'state/artGenerator/hook'
import { FlexColumn, FlexRow, ImageContainer, TextWrapper } from 'styles/components'
import { themeColor } from 'styles/theme'

import { useLayerManagement } from '../hooks'

const LayerWrapper = styled(FlexRow)`
  border-bottom: ${themeColor.border2};
  cursor: pointer;

  &:hover {
    background-color: ${themeColor.text2};
    opacity: 0.8;

    span {
      color: ${themeColor.text6};
    }
  }
`

const LayerListContainer: React.FC = () => {
  const layerList = useLayerList()
  const { handleAddRemoveLayer, handleHideLayer } = useLayerManagement()

  return (
    <FlexColumn colWidth={'16%'} colHeight={'calc(100vh - 60px)'} backgroundColor={themeColor.background4} gap={'0px'}>
      <LayerWrapper padding={'4%'} onClick={() => handleAddRemoveLayer('add')}>
        <TextWrapper color={'text5'} fontSize={'xs'} fontWeight={'semiBold'} lineHeight={14}>
          {'LAYER'}
        </TextWrapper>
        <ImageContainer src={ADD_LAYER_ICON} alt={'add new Layer'} width={'24px'} />
      </LayerWrapper>
      {layerList.length > 0 &&
        layerList.map((layer) => (
          <LayerWrapper key={layer.id} padding={'24px'} onClick={() => handleHideLayer(layer.id)}>
            <FlexRow rowWidth={'fit-content'} justifyContent={'flex-start'}>
              <IoMdQrScanner color={themeColor.text6} size={16} />
              <TextWrapper color={'text5'} fontSize={'xs'} fontWeight={'semiBold'} lineHeight={14}>
                {`LAYER ${layer.id}`}
              </TextWrapper>
            </FlexRow>
            {layer.isHide ? <IoMdEyeOff color={themeColor.text6} size={16} /> : <IoMdEye color={themeColor.text6} size={16} />}
          </LayerWrapper>
        ))}
    </FlexColumn>
  )
}

export default LayerListContainer
