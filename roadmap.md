# MeshCentral Polls Plugin Roadmap

This document outlines the development plan for the MeshCentral Polls Plugin.

## Phase 1: Core Functionality

*   [ ] **Plugin Boilerplate:** Set up the basic file structure for a MeshCentral plugin.
*   [ ] **Basic Q&A:** Implement a simple question and answer mechanism.
    *   [ ] Admin can send a long-form text question to a client.
    *   [ ] Client machine displays the question in a simple dialog.
    *   [ ] Client can input a text answer.
*   [ ] **Data Persistence:**
    *   [ ] Client sends the answer back to the server.
    *   [ ] Server stores the question and answer in the MeshCentral database.
*   [ ] **Admin Interface:**
    *   [ ] Basic UI for the admin to ask a question to a specific device.
    *   [ ] View the response from the device.

## Phase 2: Multiple Choice and Boolean Questions

*   [ ] **Question Types:** Introduce different types of questions.
    *   [ ] Yes/No (Boolean) questions.
    *   [ ] Multiple choice questions (admin provides a list of options).
*   [ ] **Client UI:**
    *   [ ] The client-side dialog will adapt to the question type (e.g., show radio buttons for multiple choice).
*   [ ] **Admin UI:**
    *   [ ] Update the admin interface to allow for creating and sending these new question types.

## Phase 3: UI/UX Enhancements

*   [ ] **Improved Client UI:**
    *   [ ] Design a more polished and user-friendly dialog for the client.
    *   [ ] Add the ability to dismiss a question.
*   [ ] **Enhanced Admin Interface:**
    *   [ ] Create a dedicated tab for the polls plugin in the MeshCentral UI.
    *   [ ] Display a history of all questions and answers for each device.
    *   [ ] Real-time updates when new answers are received.

## Phase 4: Reporting and Analytics

*   [ ] **Aggregated Views:**
    *   [ ] Admins can view aggregated results for a single poll sent to multiple devices.
*   [ ] **Data Visualization:**
    *   [ ] Display results using charts and graphs (e.g., pie chart for multiple choice answers).
*   [ ] **Export Functionality:**
    *   [ ] Allow admins to export poll results to a CSV file.

## Phase 5: Advanced Features

*   [ ] **Scheduled Polls:**
    *   [ ] Admins can schedule polls to be sent at a specific time.
*   [ ] **Device Group Targeting:**
    *   [ ] Send polls to entire device groups instead of just individual devices.
*   [ ] **Question Templates:**
    *   [ ] Admins can save and reuse frequently asked questions.
