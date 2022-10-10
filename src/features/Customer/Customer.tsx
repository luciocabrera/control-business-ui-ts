// assets
import { detailsViewImg } from 'assets';
// components
import { Button, Form, PageSpinner, Overlay } from 'components';
// hooks
import {
  useFetchCustomer,
  useFetchDocumentTypes,
  usePostCustomer,
  useRefreshCustomers,
  useRefreshCustomer,
  useFetchTitles,
} from 'hooks';
// styles
import styled from 'styled-components';
// react
import { memo, useCallback, useMemo } from 'react';
// router
import { useNavigate, useParams } from 'react-router-dom';
// types
import type { CustomerCreateType, CustomerFormType } from 'types';

const FormWrapper = styled.section`
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Customer = memo(() => {
  const { customerId } = useParams();

  const isCreating = customerId === 'new';

  const { data: documentTypes, loading: isLoadingDocumentTypes } = useFetchDocumentTypes();
  const { data: titles, loading: isLoadingTitles } = useFetchTitles();
  const { data: customer, loading: isLoadingCustomer } = useFetchCustomer(customerId);

  const refreshCustomers = useRefreshCustomers();
  const refreshCustomer = useRefreshCustomer();
  const postCustomer = usePostCustomer();

  const navigate = useNavigate();

  const titlesOptions = useMemo(
    () =>
      titles?.map((title) => ({
        label: title.name,
        value: title.name,
      })),
    [titles],
  );

  const documentTypesOptions = useMemo(
    () =>
      documentTypes?.map((documentType) => ({
        label: documentType.name,
        value: documentType.name,
      })),
    [documentTypes],
  );

  const fields = useMemo(
    () => [
      {
        type: 'row',
        fields: [
          {
            accessor: 'documentTypeName',
            label: 'Id Type',
            type: 'select',
            required: true,
            placeholder: '',
            options: documentTypesOptions,
            value: customer?.documentTypeName,
          },
          {
            accessor: 'documentId',
            label: 'ID',
            type: 'text',
            required: true,
            placeholder: `Enter the Person's ID`,
            maxLength: 50,
            value: customer?.documentId,
          },
        ],
      },
      {
        type: 'row',
        fields: [
          {
            accessor: 'titleName',
            label: 'Title',
            type: 'select',
            required: true,
            placeholder: '',
            options: titlesOptions,
            value: customer?.titleName,
          },
          {
            accessor: 'initials',
            label: 'Initials',
            type: 'text',
            required: false,
            placeholder: `Enter the Person's Initials`,
            maxLength: 10,
            value: customer?.initials,
          },
          {
            accessor: 'firstName',
            label: 'First Name',
            type: 'text',
            required: true,
            placeholder: `Enter the Person's First Name`,
            maxLength: 50,
            value: customer?.firstName,
          },
          {
            accessor: 'lastName',
            label: 'Last Name',
            type: 'text',
            placeholder: `Enter the Person's Last Name`,
            maxLength: 50,
            value: customer?.lastName,
          },
        ],
      },
      {
        label: 'Address',
        type: 'group',
        fields: [
          {
            type: 'row',
            fields: [
              {
                accessor: 'line1',
                label: 'Line 1',
                type: 'text',
                placeholder: `Street`,
                required: true,
                maxLength: 50,
                value: customer?.currentAddress.line1,
              },
              {
                accessor: 'line2',
                label: 'Line 2',
                type: 'text',
                placeholder: `Apartment, suite, house number, etc.`,
                maxLength: 50,
                value: customer?.currentAddress.line2,
              },
            ],
          },
          {
            type: 'row',
            fields: [
              {
                accessor: 'country',
                label: 'Country',
                type: 'text',
                required: true,
                // options: countriesOptions,
                // onSelect: (selectedCountry) => onCountrySelect(selectedCountry),
                value: customer?.currentAddress.country,
              },
              {
                accessor: 'state',
                label: 'State / Province',
                type: 'text',
                required: true,
                // options: regionsOptions,
                // onSelect: (selectedRegion) => onRegionSelect(selectedRegion),
                value: customer?.currentAddress.state,
              },
            ],
          },
          {
            type: 'row',
            fields: [
              {
                accessor: 'city',
                label: 'City / Town',
                type: 'text',
                required: true,
                // options: citiesOptions,
                value: customer?.currentAddress.city,
              },
              {
                accessor: 'postalCode',
                label: 'ZIP / Postal code',
                type: 'text',
                required: true,
                placeholder: `XXXX XX`,
                maxLength: 50,
                value: customer?.currentAddress.postalCode,
              },
            ],
          },
        ],
      },
    ],
    [
      customer?.currentAddress.city,
      customer?.currentAddress.country,
      customer?.currentAddress.line1,
      customer?.currentAddress.line2,
      customer?.currentAddress.postalCode,
      customer?.currentAddress.state,
      customer?.documentId,
      customer?.documentTypeName,
      customer?.firstName,
      customer?.initials,
      customer?.lastName,
      customer?.titleName,
      documentTypesOptions,
      titlesOptions,
    ],
  );

  const onAccept = useCallback(
    async (payload: CustomerFormType) => {
      debugger;
      const { firstName, lastName, documentId, documentTypeName, titleName, initials, ...currentAddress } = payload;
      const calculatedCustomerId = customerId === 'new' ? undefined : customerId;

      const body: CustomerCreateType = {
        customerId: calculatedCustomerId,
        initials,
        firstName,
        lastName,
        documentId,
        documentTypeName,
        titleName,
        addresses: { ...currentAddress },
      };

      try {
        const res = await postCustomer(body);
        if ([200, 201].includes(res?.status || 0)) {
          // notify('success', 'Connection successfully saved', 'The Connection has been successfully saved.');
          refreshCustomers?.();
          refreshCustomer(calculatedCustomerId);
          navigate(`/customers`);
        } else {
          //  notify('error', 'Error saving Connection');
        }
      } catch (err) {
        // notify('error', 'Error saving Connection', (err as { message: string }).message);
        console.log('error', err);
      }
    },
    [customerId, navigate, postCustomer, refreshCustomer, refreshCustomers],
  );

  const onCancel = useCallback(
    (event: { preventDefault: () => void }) => {
      event.preventDefault();
      navigate('/customers');
    },
    [navigate],
  );

  if (((isLoadingCustomer || !fields) && !isCreating) || isLoadingDocumentTypes || isLoadingTitles)
    return <PageSpinner />;

  console.log('customer', customer);
  console.log('fields', fields);
  return (
    <FormWrapper>
      <Overlay />v
      <Form<CustomerFormType>
        icon={detailsViewImg}
        title="Customer"
        initialFields={fields}
        initialData={customer}
        onAccept={onAccept}
        onFinish={() => navigate('/customers')}
        actions={
          <Button id="form-customer-button-cancel" type="button" inverse onClick={onCancel}>
            Cancel
          </Button>
        }
      />
    </FormWrapper>
  );
});
export default Customer;
