<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#35A768">

    <title><?= lang('page_title') . ' ' . $company_name ?></title>

    <link rel="stylesheet" type="text/css" href="<?= asset_url('assets/ext/bootstrap/css/bootstrap.min.css') ?>">
    <link rel="stylesheet" type="text/css" href="<?= asset_url('assets/ext/jquery-ui/jquery-ui.min.css') ?>">
    <link rel="stylesheet" type="text/css" href="<?= asset_url('assets/ext/cookieconsent/cookieconsent.min.css') ?>">
    <link rel="stylesheet" type="text/css" href="<?= asset_url('assets/css/frontend.css') ?>">
    <link rel="stylesheet" type="text/css" href="<?= asset_url('assets/css/general.css') ?>">

    <link rel="icon" type="image/x-icon" href="<?= asset_url('assets/img/favicon.ico') ?>">
    <link rel="icon" sizes="192x192" href="<?= asset_url('assets/img/logo.png') ?>">

    <script src="<?= asset_url('assets/ext/fontawesome/js/fontawesome.min.js') ?>"></script>
    <script src="<?= asset_url('assets/ext/fontawesome/js/solid.min.js') ?>"></script>
    <style>
        .card > .overlay,
        .card > .loading-img,
        .overlay-wrapper > .overlay,
        .overlay-wrapper > .loading-img,
        .info-box > .overlay,
        .info-box > .loading-img,
        .small-box > .overlay,
        .small-box > .loading-img {
        height: 100%;
        left: 0;
        position: absolute;
        top: 0;
        width: 100%;
        }

        .card .overlay,
        .overlay-wrapper .overlay,
        .info-box .overlay,
        .small-box .overlay {
        border-radius: 0.25rem;
        -ms-flex-align: center;
        align-items: center;
        background-color: rgba(255, 255, 255, 0.7);
        display: -ms-flexbox;
        display: flex;
        -ms-flex-pack: center;
        justify-content: center;
        z-index: 50;
        }
    </style>
</head>

<body>
<div id="main" class="container">
    <div class="row wrapper">
        <div id="book-appointment-wizard" class="col-12 col-lg-10 col-xl-8">

            <!-- FRAME TOP BAR -->

            <div id="header">
                <span id="company-name"><?= $company_name ?></span>

                <div id="steps">
                    <div id="step-1" class="book-step active-step"
                         data-tippy-content="<?= lang('service_and_provider') ?>">
                        <strong>1</strong>
                    </div>

                    <div id="step-2" class="book-step" data-toggle="tooltip"
                         data-tippy-content="<?= lang('appointment_date_and_time') ?>">
                        <strong>2</strong>
                    </div>
                    <div id="step-3" class="book-step" data-toggle="tooltip"
                         data-tippy-content="<?= lang('customer_information') ?>">
                        <strong>3</strong>
                    </div>
                    <div id="step-4" class="book-step" data-toggle="tooltip"
                         data-tippy-content="<?= lang('appointment_confirmation') ?>">
                        <strong>4</strong>
                    </div>
                </div>
            </div>

            <?php if ($manage_mode): ?>
                <div id="cancel-appointment-frame" class="row booking-header-bar">
                    <div class="col-12 col-md-10">
                        <small><?= lang('cancel_appointment_hint') ?></small>
                    </div>
                    <div class="col-12 col-md-2">
                        <form id="cancel-appointment-form" method="post"
                              action="<?= site_url('appointments/cancel/' . $appointment_data['hash']) ?>">

                            <input type="hidden" name="csrfToken" value="<?= $this->security->get_csrf_hash() ?>"/>

                            <textarea name="cancel_reason" style="display:none"></textarea>

                            <button id="cancel-appointment" class="btn btn-warning btn-sm">
                                <?= lang('cancel') ?>
                            </button>
                        </form>
                    </div>
                </div>
                <div class="booking-header-bar row">
                    <div class="col-12 col-md-10">
                        <small><?= lang('delete_personal_information_hint') ?></small>
                    </div>
                    <div class="col-12 col-md-2">
                        <button id="delete-personal-information"
                                class="btn btn-danger btn-sm"><?= lang('delete') ?></button>
                    </div>
                </div>
            <?php endif; ?>

            <?php if (isset($exceptions)): ?>
                <div style="margin: 10px">
                    <h4><?= lang('unexpected_issues') ?></h4>

                    <?php foreach ($exceptions as $exception): ?>
                        <?= exceptionToHtml($exception) ?>
                    <?php endforeach ?>
                </div>
            <?php endif ?>


            <!-- SELECT SERVICE AND PROVIDER -->

            <div id="wizard-frame-1" class="wizard-frame">
                <div class="frame-container">
                    <h2 class="frame-title"><?= lang('service_and_provider') ?></h2>

                    <div class="row frame-content">
                        <div class="col">
                            <div class="form-group">
                                <label for="select-service">
                                    <strong><?= lang('service') ?></strong>
                                </label>

                                <select id="select-service" class="form-control">
                                    <?php
                                    // Group services by category, only if there is at least one service with a parent category.
                                    $has_category = FALSE;
                                    foreach ($available_services as $service)
                                    {
                                        if ($service['category_id'] != NULL)
                                        {
                                            $has_category = TRUE;
                                            break;
                                        }
                                    }

                                    if ($has_category)
                                    {
                                        $grouped_services = [];

                                        foreach ($available_services as $service)
                                        {
                                            if ($service['category_id'] != NULL)
                                            {
                                                if ( ! isset($grouped_services[$service['category_name']]))
                                                {
                                                    $grouped_services[$service['category_name']] = [];
                                                }

                                                $grouped_services[$service['category_name']][] = $service;
                                            }
                                        }

                                        // We need the uncategorized services at the end of the list so we will use
                                        // another iteration only for the uncategorized services.
                                        $grouped_services['uncategorized'] = [];
                                        foreach ($available_services as $service)
                                        {
                                            if ($service['category_id'] == NULL)
                                            {
                                                $grouped_services['uncategorized'][] = $service;
                                            }
                                        }

                                        foreach ($grouped_services as $key => $group)
                                        {
                                            $group_label = ($key != 'uncategorized')
                                                ? $group[0]['category_name'] : 'Uncategorized';

                                            if (count($group) > 0)
                                            {
                                                echo '<optgroup label="' . $group_label . '">';
                                                foreach ($group as $service)
                                                {
                                                    echo '<option value="' . $service['id'] . '">'
                                                        . $service['name'] . '</option>';
                                                }
                                                echo '</optgroup>';
                                            }
                                        }
                                    }
                                    else
                                    {
                                        foreach ($available_services as $service)
                                        {
                                            echo '<option value="' . $service['id'] . '">' . $service['name'] . '</option>';
                                        }
                                    }
                                    ?>
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="select-provider">
                                    <strong><?= lang('provider') ?></strong>
                                </label>

                                <select id="select-provider" class="form-control"></select>
                            </div>

                            <div class="d-none" id="service-description"></div>
                        </div>
                    </div>
                </div>

                <div class="command-buttons">
                    <span>&nbsp;</span>

                    <button type="button" id="button-next-1" class="btn button-next btn-dark"
                            data-step_index="1">
                        <?= lang('next') ?>
                        <i class="fas fa-chevron-right ml-2"></i>
                    </button>
                </div>
            </div>

            <!-- SELECT APPOINTMENT DATE -->

            <div id="wizard-frame-2" class="wizard-frame" style="display:none;">
                <div class="frame-container">

                    <h2 class="frame-title"><?= lang('appointment_date_and_time') ?></h2>

                    <div class="row frame-content">
                        <div class="col-12">
                        <div style="padding: 20px; border: 1px solid black; margin: 20px;">
                            <!--<p style="text-align:center">Did you make payment already? 
                            <br>
                            If YES, please confirm appointment request below.
                            <br>
                            <br>
                            If NOT, <a href="https://nhsiphilippines.com/baguiocity/make-an-appointment/">CLICK HERE TO UPLOAD YOUR DEPOSIT SLIP</a></p>
                            <hr>-->
                            <strong>IMPORTANT NOTICE: Do not create many online appointments for only one applicant because our system will delete multiple appointments.</strong><br><br>
                            1. IF YOU ARE LOCATED ABROAD OR USING A VPN SERVICE ON YOUR DEVICE, THE TIMEZONE MAY BE AFFECTED WHILE CREATING AN APPOINTMENT, ALL ONLINE APPOINTMENTS ARE BASED ON COMPANY OPERATING HOURS IN THE PHILIPPINES. PLEASE CHECK YOUR TIMEZONES ACCORDINGLY AND VIEW OUR COMPANY OPERATING HOURS.<br><br>
                            2. Please make sure that you get an appointment for EACH APPLICANT (you must use a different email address for each applicant) – this online booking system is designed as a ONE-SLOT PER APPLICANT system.<br><br>
                            3. ALWAYS FOLLOW INSTRUCTIONS AND RULES. ANY WILLFUL DISHONESTY MAY RENDER THE REFUSAL OF YOUR APPLICATON.<br><br>
                            4. By using this website, you declare that all information you provided is true and correct and you also understand that any willful dishonesty may render the refusal of this application.<br><br>
                            5. IF YOU CONTINUE TO USE THIS WEBSITE, YOU WILLFULY AGREE TO OUR TERMS, CONDITIONS, AND PRIVACY POLICY; IF YOU DO NOT AGREE, DO NOT USE THE SITE.<br><br>
                            6. <strong>Please note that TB Screening Test is available Mondays to Fridays ONLY.</strong><br>
                            </div>
                        </div>

                        <hr>
                        <div class="col-12">
                            <p style="text-align:center">Available time slots will appear below. Please wait a few moments.<br></p>
                        </div>
                        <hr>

                        <div class="col-12 col-md-6">
                            <div id="calendar-loader" class="overlay-wrapper">
                                <div class="overlay d-none">
                                    <p>LOADING ...</p>
                                </div>
                            </div>
                            <div id="select-date"></div>
                        </div>

                        <div class="col-12 col-md-6">
                            <div id="select-time">
                                <div class="form-group">
                                    <label for="select-timezone"><?= lang('timezone') ?></label>
                                    <?= render_timezone_dropdown('id="select-timezone" class="form-control" value="UTC"'); ?>
                                </div>

                                <p id="available-hours-loading-info"></p>
                                <div id="available-hours">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="command-buttons">
                    <button type="button" id="button-back-2" class="btn button-back btn-outline-secondary"
                            data-step_index="2">
                        <i class="fas fa-chevron-left mr-2"></i>
                        <?= lang('back') ?>
                    </button>
                    <button type="button" id="button-next-2" class="btn button-next btn-dark"
                            data-step_index="2">
                        Proceed to make an appointment
                        <i class="fas fa-chevron-right ml-2"></i>
                    </button>
                </div>
            </div>

            <!-- ENTER CUSTOMER DATA -->

            <div id="wizard-frame-3" class="wizard-frame" style="display:none;">
                <div class="frame-container">

                    <h2 class="frame-title"><?= lang('customer_information') ?></h2>

                    <div class="row frame-content">
                        <div class="col-md-12">
                            <div>
                                <hr>
                                <p style="text-align:center"><strong>ONLY 1 (ONE) APPOINTMENT TIME SLOT PER APPLICANT IS ALLOWED.</strong><br>Create a separate appointment for each applicant</p>
                                <hr>
                                <p style="text-align:center"><strong>Do not create many online appointments for only one applicant</strong> <br>because our system will delete multiple appointments.</p>
                                <hr>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="created-by" class="control-label">
                                    Name of person creating appointment
                                    <span class="text-danger">*</span>
                                </label>
                                <input type="text" id="created-by" class="required form-control" maxlength="100"/>
                            </div>
                            <div class="form-group">
                                <label for="first-name" class="control-label">
                                    <?= lang('first_name') ?>
                                    <span class="text-danger">*</span>
                                </label>
                                <input type="text" id="first-name" class="required form-control" maxlength="100"/>
                            </div>
                            <div class="form-group">
                                <label for="last-name" class="control-label">
                                    <?= lang('last_name') ?>
                                    <span class="text-danger">*</span>
                                </label>
                                <input type="text" id="last-name" class="required form-control" maxlength="120"/>
                            </div>
                            <div class="form-group">
                                <label for="email" class="control-label">
                                    <?= lang('email') ?>
                                    <span class="text-danger">*</span>
                                </label>
                                <input type="text" id="email" class="required form-control" maxlength="120"/>
                            </div>
                            <div class="form-group">
                                <label for="phone-number" class="control-label">
                                    <?= lang('phone_number') ?>
                                    <?= $require_phone_number === '1' ? '<span class="text-danger">*</span>' : '' ?>
                                </label>
                                <input type="text" id="phone-number" maxlength="60"
                                       class="<?= $require_phone_number === '1' ? 'required' : '' ?> form-control"/>
                            </div>
                            <div class="form-group">
                                <label for="address" class="control-label">
                                    <?= lang('address') ?>
                                    <span class="text-danger">*</span>
                                </label>
                                <input type="text" id="address" class="required form-control" maxlength="120"/>
                            </div>
                            <div class="form-group">
                                <label for="city" class="control-label">
                                    <?= lang('city') ?>
                                    <span class="text-danger">*</span>
                                </label>
                                <input type="text" id="city" class="required form-control" maxlength="120"/>
                            </div>
                            <div class="form-group">
                                <label for="zip-code" class="control-label">
                                    <?= lang('zip_code') ?>
                                </label>
                                <input type="text" id="zip-code" class="form-control" maxlength="120"/>
                            </div>
                            <div class="form-group">
                                <label for="notes" class="control-label">
                                    <?= lang('notes') ?>
                                </label>
                                <textarea id="notes" maxlength="500" class="form-control" rows="4"></textarea>
                            </div>
                        </div>
                        <!-- Custom Fields -->
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="sex" class="control-label">
                                    Sex
                                    <span class="text-danger">*</span>
                                </label>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="sex" id="sex-male" value="male">
                                    <label class="form-check-label" for="sex-male">
                                        Male
                                    </label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="sex" id="sex-female" value="female">
                                    <label class="form-check-label" for="sex-female">
                                        Female
                                    </label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="birth-date" class="control-label">
                                    Birth Date
                                    <span class="text-danger">*</span>
                                </label>
                                <input type="date" id="birth-date" class="required form-control"/>
                            </div>
                            <div class="form-group">
                                <label for="passport-number" class="control-label">
                                    Passport Number
                                </label>
                                <input id="passport-number" class="form-control" maxlength="120"/>
                            </div>
                            <div class="form-group">
                                <label for="passport-expiry-date" class="control-label">
                                    Passport Expiry Date
                                </label>
                                <input type="date" id="passport-expiry-date" class="form-control"/>
                            </div>
                            <div class="form-group">
                                <label for="applicant-type">Applicant Type <span class="text-danger">*</span></label>
                                <select id="applicant-type" class="required form-control">
                                    <option value=""></option>
                                    <option value="Not Applicable">Not Applicable</option>
                                    <option value="CANADA">CANADA</option>
                                    <option value="AUSTRALIA">AUSTRALIA</option>
                                    <option value="NEW ZEALAND">NEW ZEALAND</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <i class="canada-applicants-info d-none">
                                    FOR CANADA APPLICANTS,
                                    <br>
                                    If you received a letter from the Embassy, type in IME/UCI # below:
                                    <br>
                                    If UPFRONT medical, type in your visa category (Student, Visitor, Worker) below:
                                </i>
                                <i class="australia-applicants-info d-none">
                                    FOR AUSTRALIA APPLICANTS, type in HAP ID below:
                                </i>
                                <i class="new-zealand-applicants-info d-none">
                                    FOR NEW ZEALAND APPLICANTS, type in NZER/NZHR:
                                    <br>
                                    If UPFRONT MEDICAL, type in your visa catergory and visa type below:
                                </i>
                            </div>
                            <div class="form-group client-id-reference-number-container d-none">
                                <label for="client-id-reference-number" class="control-label">
                                </label>
                                <input id="client-id-reference-number" class="form-control" maxlength="120"/>
                            </div>
                            <div class="form-group visa-category-container d-none">
                                <label for="visa-category" class="control-label">
                                    Visa category
                                </label>
                                <input id="visa-category" class="form-control" maxlength="120"/>
                            </div>
                            <div class="form-group visa-type-container d-none">
                                <label for="visa-type" class="control-label">
                                    Type of visa
                                </label>
                                <input id="visa-type" class="form-control" maxlength="120"/>
                            </div>
                            <div class="form-group d-none">
                                <label for="proof-of-payment">Proof of Payment</label>
                                <input type="file" class="form-control-file" id="proof-of-payment" accept="image/*">
                            </div>
                            <div class="form-group">
                                <label for="proof-of-identity">Proof of Identity <span class="text-danger">*</span></label>
                                <input type="file" class="form-control-file required" id="proof-of-identity" accept="image/*">
                            </div>
                        </div>
                        <!-- END OF Custom Fields -->
                    </div>
                </div>

                <?php if ($display_terms_and_conditions): ?>
                    <div class="form-check mb-3">
                        <input type="checkbox" class="required form-check-input" id="accept-to-terms-and-conditions">
                        <label class="form-check-label" for="accept-to-terms-and-conditions">
                            <?= strtr(lang('read_and_agree_to_terms_and_conditions'),
                                [
                                    '{$link}' => '<a href="#" data-toggle="modal" data-target="#terms-and-conditions-modal">',
                                    '{/$link}' => '</a>'
                                ])
                            ?>
                        </label>
                    </div>
                <?php endif ?>

                <?php if ($display_privacy_policy): ?>
                    <div class="form-check mb-3">
                        <input type="checkbox" class="required form-check-input" id="accept-to-privacy-policy">
                        <label class="form-check-label" for="accept-to-privacy-policy">
                            <?= strtr(lang('read_and_agree_to_privacy_policy'),
                                [
                                    '{$link}' => '<a href="#" data-toggle="modal" data-target="#privacy-policy-modal">',
                                    '{/$link}' => '</a>'
                                ])
                            ?>
                        </label>
                    </div>
                <?php endif ?>

                <div class="command-buttons">
                    <button type="button" id="button-back-3" class="btn button-back btn-outline-secondary"
                            data-step_index="3">
                        <i class="fas fa-chevron-left mr-2"></i>
                        <?= lang('back') ?>
                    </button>
                    <button type="button" id="button-next-3" class="btn button-next btn-dark"
                            data-step_index="3">
                        <?= lang('next') ?>
                        <i class="fas fa-chevron-right ml-2"></i>
                    </button>
                </div>
            </div>

            <!-- APPOINTMENT DATA CONFIRMATION -->

            <div id="wizard-frame-4" class="wizard-frame" style="display:none;">
                <div class="frame-container">
                    <h2 class="frame-title"><?= lang('appointment_confirmation') ?></h2>
                    <div class="row frame-content">
                        <div id="appointment-details" class="col-12 col-md-6"></div>
                        <div id="customer-details" class="col-12 col-md-6"></div>
                    </div>
                    <?php if ($this->settings_model->get_setting('require_captcha') === '1'): ?>
                        <div class="row frame-content">
                            <div class="col-12 col-md-6">
                                <h4 class="captcha-title">
                                    CAPTCHA
                                    <button class="btn btn-link text-dark text-decoration-none py-0">
                                        <i class="fas fa-sync-alt"></i>
                                    </button>
                                </h4>
                                <img class="captcha-image" src="<?= site_url('captcha') ?>">
                                <input class="captcha-text form-control" type="text" value=""/>
                                <span id="captcha-hint" class="help-block" style="opacity:0">&nbsp;</span>
                            </div>
                        </div>
                    <?php endif; ?>
                </div>

                <div class="command-buttons">
                    <button type="button" id="button-back-4" class="btn button-back btn-outline-secondary"
                            data-step_index="4">
                        <i class="fas fa-chevron-left mr-2"></i>
                        <?= lang('back') ?>
                    </button>
                    <form id="book-appointment-form" style="display:inline-block" method="post">
                        <button id="book-appointment-submit" type="button" class="btn btn-success">
                            <i class="fas fa-check-square mr-2"></i>
                            <?= ! $manage_mode ? lang('confirm') : lang('update') ?>
                        </button>
                        <input type="hidden" name="csrfToken"/>
                        <input type="hidden" name="post_data"/>
                        <!-- <input type="file" id="proof-of-payment-input"/> -->
                        <!-- <input type="file" name="proof-of-identity-input"/> -->
                    </form>
                </div>
            </div>

            <!-- FRAME FOOTER -->

            <div id="frame-footer">
                <small>
                    <span class="footer-powered-by">
                        Powered By

                        <a href="https://easyappointments.org" target="_blank">Easy!Appointments</a>
                    </span>

                    <span class="footer-options">
                        <span id="select-language" class="badge badge-secondary">
                            <i class="fas fa-language mr-2"></i>
                            <?= ucfirst(config('language')) ?>
                        </span>

                        <a class="backend-link badge badge-primary" href="<?= site_url('backend'); ?>">
                            <i class="fas fa-sign-in-alt mr-2"></i>
                            <?= $this->session->user_id ? lang('backend_section') : lang('login') ?>
                        </a>
                    </span>
                </small>
            </div>
        </div>
    </div>
</div>

<?php if ($display_cookie_notice === '1'): ?>
    <?php require 'cookie_notice_modal.php' ?>
<?php endif ?>

<?php if ($display_terms_and_conditions === '1'): ?>
    <?php require 'terms_and_conditions_modal.php' ?>
<?php endif ?>

<?php if ($display_privacy_policy === '1'): ?>
    <?php require 'privacy_policy_modal.php' ?>
<?php endif ?>

<script>
    var GlobalVariables = {
        availableServices: <?= json_encode($available_services) ?>,
        availableProviders: <?= json_encode($available_providers) ?>,
        baseUrl: <?= json_encode(config('base_url')) ?>,
        manageMode: <?= $manage_mode ? 'true' : 'false' ?>,
        customerToken: <?= json_encode($customer_token) ?>,
        dateFormat: <?= json_encode($date_format) ?>,
        timeFormat: <?= json_encode($time_format) ?>,
        firstWeekday: <?= json_encode($first_weekday) ?>,
        displayCookieNotice: <?= json_encode($display_cookie_notice === '1') ?>,
        appointmentData: <?= json_encode($appointment_data) ?>,
        providerData: <?= json_encode($provider_data) ?>,
        customerData: <?= json_encode($customer_data) ?>,
        displayAnyProvider: <?= json_encode($display_any_provider) ?>,
        csrfToken: <?= json_encode($this->security->get_csrf_hash()) ?>
    };

    var EALang = <?= json_encode($this->lang->language) ?>;
    var availableLanguages = <?= json_encode(config('available_languages')) ?>;
</script>

<script src="<?= asset_url('assets/js/general_functions.js') ?>"></script>
<script src="<?= asset_url('assets/ext/jquery/jquery.min.js') ?>"></script>
<script src="<?= asset_url('assets/ext/jquery-ui/jquery-ui.min.js') ?>"></script>
<script src="<?= asset_url('assets/ext/cookieconsent/cookieconsent.min.js') ?>"></script>
<script src="<?= asset_url('assets/ext/bootstrap/js/bootstrap.bundle.min.js') ?>"></script>
<script src="<?= asset_url('assets/ext/popper/popper.min.js') ?>"></script>
<script src="<?= asset_url('assets/ext/tippy/tippy-bundle.umd.min.js') ?>"></script>
<!-- <script src="<?= asset_url('assets/ext/datejs/date.min.js') ?>"></script> -->
<script src="<?= asset_url('assets/ext/datejs/date.js') ?>"></script>
<script src="<?= asset_url('assets/ext/moment/moment.min.js') ?>"></script>
<script src="<?= asset_url('assets/ext/moment/moment-timezone-with-data.min.js') ?>"></script>
<script src="<?= asset_url('assets/js/frontend_book_api.js') ?>"></script>
<script src="<?= asset_url('assets/js/frontend_book.js') ?>"></script>

<script>
    $(function () {
        FrontendBook.initialize(true, GlobalVariables.manageMode);
        GeneralFunctions.enableLanguageSelection($('#select-language'));
    });
</script>

<!-- Custom Fields -->
<script>
    $(function(){
        $('#applicant-type').on('change', function(){
            let applicantType = $(this).val();
            let clientIDReferenceNumber = "ID #";
            $('.client-id-reference-number-container').addClass('d-none');
            $('.visa-category-container').addClass('d-none');
            $('.visa-type-container').addClass('d-none');
            $('.canada-applicants-info').addClass('d-none');
            $('.australia-applicants-info').addClass('d-none');
            $('.new-zealand-applicants-info').addClass('d-none');
            switch (applicantType) {
                case 'CANADA':
                    clientIDReferenceNumber = 'IME/UCCI #';
                    $('.canada-applicants-info').removeClass('d-none');
                    $('.client-id-reference-number-container').removeClass('d-none');
                    $('.visa-category-container').removeClass('d-none');
                    $('.visa-type-container').removeClass('d-none');
                    break;
                case 'AUSTRALIA':
                    clientIDReferenceNumber = 'HAP ID';
                    $('.australia-applicants-info').removeClass('d-none');
                    $('.client-id-reference-number-container').removeClass('d-none');
                    break;
                case 'NEW ZEALAND':
                    clientIDReferenceNumber = 'NZER/NZHR';
                    $('.new-zealand-applicants-info').removeClass('d-none');
                    $('.client-id-reference-number-container').removeClass('d-none');
                    $('.visa-category-container').removeClass('d-none');
                    $('.visa-type-container').removeClass('d-none');
                    break;
            
                default:
                    $('.client-id-reference-number-container').addClass('d-none');
                    $('.visa-category-container').addClass('d-none');
                    $('.visa-type-container').addClass('d-none');
                    break;
            }
            $('label[for="client-id-reference-number"]').text(clientIDReferenceNumber);
        });
    });
</script>

<?php google_analytics_script(); ?>
</body>
</html>
