import { ProfileViewModel } from "models/DTOs/userModel";
import { ValidationModel } from "models/validationModel";

// Partial base state
export interface ErrorsState<TForm> {
  message?: string;
  errors?: ValidationModel<TForm>;
}

export interface StatusState {
  isSuccess: boolean;
  isLoading: boolean;
}

export interface RecordsState<TView> {
  records: TView[];
}

export interface RecordState<TView> {
  record: TView;
}

export interface RowCountState {
  totalRecords: number;
  filteredRecords: number;
}

// Base state
export interface BaseStatusState<TForm> extends StatusState, ErrorsState<TForm> { }

export interface BaseDataState<TView> extends RecordsState<TView>, RecordState<TView>, RowCountState { }

export interface BaseState<TView, TForm> extends BaseDataState<TView>, BaseStatusState<TForm> { }

export interface BaseAuthState {
  user: ProfileViewModel;
  token: string | null;
}

// Base actions
export interface BaseResponseState {
  isSuccess: boolean;
  message: string;
}

// Base success actions
export interface BaseFetchRecordsSuccess<TView> extends BaseResponseState {
  records: TView[];
  totalRecords: number;
  filteredRecords: number;
}

export interface BaseFetchRecordSuccess<TView> extends BaseResponseState {
  record: TView;
}

export interface BaseAddSuccess<TView> extends BaseResponseState {
  record: TView;
}

export interface BaseEditSuccess<TView> extends BaseResponseState {
  record: TView;
}

export interface BaseRemoveSuccess extends BaseResponseState {
  recordId: string;
}

// Base failed actions
export interface BaseFetchRecordsFailed extends BaseResponseState {

}

export interface BaseFetchRecordFailed extends BaseResponseState {

}

export interface BaseAddFailed<TForm> extends BaseResponseState {
  errors?: ValidationModel<TForm>;
}

export interface BaseEditFailed<TForm> extends BaseResponseState {
  errors?: ValidationModel<TForm>;
}

export interface BaseRemoveFailed extends BaseResponseState {
  
}

// Base auth success
export interface BaseRegisterSuccess extends BaseResponseState {

}

export interface BaseLoginSuccess extends BaseResponseState {
  token: string;
}

export interface BaseAuthFailed<TForm> extends BaseResponseState {
  errors?: ValidationModel<TForm>;
}
