// Copyright IBM Corp. 2017. All Rights Reserved.
// Node module: @loopback/rest
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {
  Component,
  CoreBindings,
  ProviderMap,
  Application,
} from '@loopback/core';
import {inject} from '@loopback/context';
import {RestBindings} from './keys';
import {LogErrorProvider} from './providers';
import {
  BindElementProvider,
  FindRouteProvider,
  GetFromContextProvider,
  InvokeMethodProvider,
  RejectProvider,
  ParseParamsProvider,
  SendProvider,
} from './providers';
import {RestServer, RestServerConfig} from './rest-server';

export class RestComponent implements Component {
  providers: ProviderMap = {
    [RestBindings.SequenceActions.LOG_ERROR]: LogErrorProvider,
    [RestBindings.SequenceActions.FIND_ROUTE]: FindRouteProvider,
    [RestBindings.SequenceActions.INVOKE_METHOD]: InvokeMethodProvider,
    [RestBindings.SequenceActions.REJECT]: RejectProvider,
    [RestBindings.BIND_ELEMENT]: BindElementProvider,
    [RestBindings.GET_FROM_CONTEXT]: GetFromContextProvider,
    [RestBindings.SequenceActions.PARSE_PARAMS]: ParseParamsProvider,
    [RestBindings.SequenceActions.SEND]: SendProvider,
  };

  constructor(
    @inject(CoreBindings.APPLICATION_INSTANCE) app: Application,
    @inject(CoreBindings.APPLICATION_CONFIG) config?: RestComponentConfig,
  ) {
    if (!config) {
      config = {};
    }
    if (config.name) {
      app.server(RestServer, config.name).options({
        config,
      });
    } else {
      app.server(RestServer).options({
        config,
      });
    }
  }
}

export interface RestComponentConfig extends RestServerConfig {
  name?: string;
}
