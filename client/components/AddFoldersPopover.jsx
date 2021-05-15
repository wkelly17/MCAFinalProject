import React, { useState } from 'react';

import { Popover } from '@headlessui/react';
import { usePopper } from 'react-popper';
import { PlusSignOutlineIcon } from './Icons';
import HookForm from './HookFormParts';
import { useMutation, queryClient, useQueryClient } from 'react-query';
import { addFolders } from '../utils/apiFunctions';

export default function CreateFoldersPopover() {
  let [referenceElement, setReferenceElement] = useState();
  let [popperElement, setPopperElement] = useState();

  const [defaultValues, setDefaultValues] = useState();
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: 'right',
    modifiers: [
      {
        name: 'offset',
        enabled: true,
        options: {
          offset: [15, 20],
        },
      },
    ],
  });
  //   debugger;
  const queryClient = useQueryClient();

  const SubmitMutation = useMutation(addFolders, {
    onSuccess: () => {
      queryClient.invalidateQueries('folders');
      // close the modal
      referenceElement.click();
    },
  });

  return (
    <Popover className="inline-block align-middle">
      <Popover.Button ref={setReferenceElement}>
        <PlusSignOutlineIcon className="rounded-full " />
      </Popover.Button>

      <Popover.Panel
        className="p-2 bg-$base4 text-$base7 border-3 border-$secondary8 rounded-md max-w-42"
        ref={setPopperElement}
        style={styles.popper}
        {...attributes.popper}
      >
        <HookForm
          id="foldersForm"
          className="p-1"
          onSubmit={SubmitMutation.mutate}
          defaultValues={defaultValues}
        >
          {/*  onSubmit={handleSubmit((data) =>
              SubmitMutation.mutate({ data, recipeId })
            ) */}
          <HookForm.FormTitle as="p" className="mb-1 text-sm">
            Input a comma separate list of folders you'd like to create{' '}
          </HookForm.FormTitle>
          <HookForm.Input
            name="newfolders"
            inputClasses="bg-$base7 text-$base2 rounded-md p-1 w-full text-xs"
            labelClasses="sr-only"
            labelText="Comma separate list of folders desired to create"
            id="foldersInput"
          />
          <HookForm.SubmitButton
            name="createFolders"
            className="p-2 bg-$base5 rounded-lg mt-4 text-xs hover:(bg-$success) focus:(bg-$success)"
          >
            Create Folders
          </HookForm.SubmitButton>
        </HookForm>
      </Popover.Panel>
    </Popover>
  );
}
