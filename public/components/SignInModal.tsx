import React, { useState, useEffect } from "react"
import { Modal, SignInControl, LegalFooter } from "@fider/components"
import { Button } from "./common"
import { Trans } from "@lingui/macro"
import { useFider } from "@fider/hooks"

interface SignInModalProps {
  isOpen: boolean
  onClose: () => void
}

export const SignInModal: React.StatelessComponent<SignInModalProps> = (props) => {
  const [email, setEmail] = useState("")
  const fider = useFider()

  useEffect(() => {
    if (email) {
      setTimeout(() => setEmail(""), 5000)
    }
  }, [email])

  const onEmailSent = (value: string): void => {
    setEmail(value)
  }

  if (props.isOpen && fider.settings.oauth.length == 1 && !(fider.session.tenant ? fider.session.tenant.isEmailAuthAllowed : true)) {
    // Redirect to only provider on clicking sign in
    window.location.href = fider.settings.oauth.pop()?.url ?? ""
    return <></>
  }

  const closeModal = () => {
    setEmail("")
    props.onClose()
  }

  const content = email ? (
    <>
      <p>
        <Trans id="signin.message.emailsent">
          We have just sent a confirmation link to <b>{email}</b>. Click the link and you’ll be signed in.
        </Trans>
      </p>
      <p>
        <Button variant="tertiary" onClick={closeModal}>
          <Trans id="action.ok">OK</Trans>
        </Button>
      </p>
    </>
  ) : (
    <SignInControl useEmail={true} onEmailSent={onEmailSent} />
  )

  return (
    <Modal.Window isOpen={props.isOpen} onClose={closeModal}>
      <Modal.Header>
        <Trans id="modal.signin.header">Sign in to participate and vote</Trans>
      </Modal.Header>
      <Modal.Content>{content}</Modal.Content>
      <LegalFooter />
    </Modal.Window>
  )
}
