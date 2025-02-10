import { useTransaction } from "@/hooks/useTransactions";
import { Button, Col, Form, Row, Select, Space, theme } from "antd";
import { DatePicker } from "antd";
import * as S from "./style";
import Tab from "../Tabs";
import { selectedFilters } from "@/models/transactions";

const { Option } = Select;

const FilterComponent = () => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();
  const { filterProperties, fetchData, clearStorage, selectedFilters } =
    useTransaction();

  const formStyle: React.CSSProperties = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,
  };

  const onFinish = (values: any) => {
    const payload: selectedFilters = {
      account: values.account,
      industry: values.industry,
      state: values.state,
    };

    if (values.startDate && values.endDate) {
      payload["startDate"] = values.startDate.valueOf();
      payload["endDate"] = values.endDate.valueOf();
    }

    fetchData(payload);
  };

  return (
    <Form
      form={form}
      name="advanced_search"
      style={formStyle}
      onFinish={onFinish}
    >
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item name="account" label="Conta">
            {filterProperties.accounts.length > 0 ? (
              <Select showSearch>
                {filterProperties.accounts.map((item, i) => {
                  return (
                    <Option key={i} value={item}>
                      {item}
                    </Option>
                  );
                })}
              </Select>
            ) : (
              <Select disabled></Select>
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="industry" label="Industria">
            {filterProperties.industries.length > 0 ? (
              <Select showSearch>
                {filterProperties.industries.map((item, i) => {
                  return (
                    <Option key={i} value={item}>
                      {item}
                    </Option>
                  );
                })}
              </Select>
            ) : (
              <Select disabled></Select>
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="state" label="Estado">
            {filterProperties.states.length > 0 ? (
              <Select showSearch>
                {filterProperties.states.map((item, i) => {
                  return (
                    <Option key={i} value={item}>
                      {item}
                    </Option>
                  );
                })}
              </Select>
            ) : (
              <Select disabled></Select>
            )}
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="startDate" label="Data Inicial">
            <DatePicker needConfirm />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="endDate" label="Data Final">
            <DatePicker needConfirm />
          </Form.Item>
        </Col>
      </Row>
      <S.ButtonContainer>
        <S.SelectedFilterContainer>
          <p>Filtros Aplicados:</p>
          {Object.keys(selectedFilters).map((key, i) => {
            if (selectedFilters[key]) {
              return <Tab key={i} name={selectedFilters[key]} />;
            }
            return <></>;
          })}
        </S.SelectedFilterContainer>

        <Space size="small">
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            onClick={() => {
              form.resetFields();
              clearStorage();
              fetchData({});
            }}
          >
            Clear
          </Button>
        </Space>
      </S.ButtonContainer>
    </Form>
  );
};

export default FilterComponent;
