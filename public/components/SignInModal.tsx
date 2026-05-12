import React from "react"
import { Modal, SignInControl, LegalFooter, TenantLogo } from "@fider/components"
import { CloseIcon } from "./common"
import { Trans } from "@lingui/react/macro"
import { HStack, VStack } from "./layout"
import { useFider } from "@fider/hooks"

interface SignInModalProps {
  isOpen: boolean
  onClose: () => void
}

export const SignInModal: React.FC<SignInModalProps> = (props) => {
  const fider = useFider()

  if (props.isOpen && fider.settings.oauth.length == 1 && !(fider.session.tenant ? fider.session.tenant.isEmailAuthAllowed : true)) {
    // Redirect to only provider on clicking sign in
    window.location.href = fider.settings.oauth.pop()?.url ?? ""
    return <></>
  }

  const onCodeVerified = (): void => {
    // User is authenticated - close modal and reload to refresh the page
    props.onClose()
    location.reload()
  }

  return (
    <Modal.Window isOpen={props.isOpen} onClose={props.onClose}>
      <Modal.Header>
        <VStack spacing={8}>
          <HStack justify="between">
            <TenantLogo size={24} useFiderIfEmpty={true} />
            <CloseIcon closeModal={props.onClose} />
          </HStack>
          <p>
            <Trans id="modal.signin.header">Join the conversation</Trans>
          </p>
        </VStack>
      </Modal.Header>
      <Modal.Content>
        <SignInControl useEmail={true} onCodeVerified={onCodeVerified} />
      </Modal.Content>
      <LegalFooter />
    </Modal.Window>
  )
}
