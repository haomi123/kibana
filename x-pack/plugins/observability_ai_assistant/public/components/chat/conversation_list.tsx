/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiIcon,
  EuiListGroup,
  EuiListGroupItem,
  EuiLoadingSpinner,
  EuiPanel,
  EuiText,
} from '@elastic/eui';
import { css } from '@emotion/css';
import { i18n } from '@kbn/i18n';
import React from 'react';
import { NewChatButton } from '../buttons/new_chat_button';

const containerClassName = css`
  height: 100%;
`;

const titleClassName = css`
  text-transform: uppercase;
`;

export function ConversationList({
  selected,
  onClickNewChat,
  loading,
  error,
  conversations,
  onClickDeleteConversation,
}: {
  selected: string;
  onClickConversation: (conversationId: string) => void;
  onClickNewChat: () => void;
  loading: boolean;
  error?: any;
  conversations?: Array<{ id: string; label: string; href?: string }>;
  onClickDeleteConversation: (id: string) => void;
}) {
  return (
    <EuiPanel paddingSize="s" hasShadow={false}>
      <EuiFlexGroup direction="column" gutterSize="none" className={containerClassName}>
        <EuiFlexItem grow>
          <EuiFlexGroup direction="column" gutterSize="xs">
            <EuiFlexItem grow={false}>
              <EuiPanel hasBorder={false} hasShadow={false} paddingSize="s">
                <EuiFlexGroup direction="row" gutterSize="xs" alignItems="center">
                  <EuiFlexItem grow={false}>
                    <EuiText className={titleClassName} size="s">
                      <strong>
                        {i18n.translate('xpack.observabilityAiAssistant.conversationList.title', {
                          defaultMessage: 'Previously',
                        })}
                      </strong>
                    </EuiText>
                  </EuiFlexItem>
                  {loading ? (
                    <EuiFlexItem grow={false}>
                      <EuiLoadingSpinner size="s" />
                    </EuiFlexItem>
                  ) : null}
                </EuiFlexGroup>
              </EuiPanel>
            </EuiFlexItem>
            {error ? (
              <EuiFlexItem grow={false}>
                <EuiPanel hasBorder={false} hasShadow={false} paddingSize="s">
                  <EuiFlexGroup direction="row" alignItems="center" gutterSize="s">
                    <EuiFlexItem grow={false}>
                      <EuiIcon type="warning" color="danger" />
                    </EuiFlexItem>
                    <EuiFlexItem grow={false}>
                      <EuiText size="s" color="danger">
                        {i18n.translate(
                          'xpack.observabilityAiAssistant.conversationList.errorMessage',
                          {
                            defaultMessage: 'Failed to load',
                          }
                        )}
                      </EuiText>
                    </EuiFlexItem>
                  </EuiFlexGroup>
                </EuiPanel>
              </EuiFlexItem>
            ) : null}
            {conversations?.length ? (
              <EuiFlexItem grow>
                <EuiListGroup flush={false} gutterSize="none">
                  {conversations?.map((conversation) => (
                    <EuiListGroupItem
                      key={conversation.id}
                      label={conversation.label}
                      size="s"
                      isActive={conversation.id === selected}
                      isDisabled={loading}
                      href={conversation.href}
                      extraAction={
                        conversation.id
                          ? {
                              iconType: 'trash',
                              onClick: () => {
                                onClickDeleteConversation(conversation.id);
                              },
                            }
                          : undefined
                      }
                    />
                  ))}
                </EuiListGroup>
              </EuiFlexItem>
            ) : null}

            {!loading && !error && !conversations?.length ? (
              <EuiPanel hasBorder={false} hasShadow={false} paddingSize="s">
                <EuiText color="subdued" size="s">
                  {i18n.translate(
                    'xpack.observabilityAiAssistant.conversationList.noConversations',
                    {
                      defaultMessage: 'No conversations',
                    }
                  )}
                </EuiText>
              </EuiPanel>
            ) : null}
          </EuiFlexGroup>
        </EuiFlexItem>

        <EuiFlexItem grow={false}>
          <EuiPanel paddingSize="s" hasBorder={false} hasShadow={false}>
            <EuiFlexGroup alignItems="center">
              <EuiFlexItem grow>
                <NewChatButton onClick={onClickNewChat} />
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiPanel>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiPanel>
  );
}
