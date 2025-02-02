import rookie from '@rookie-rs/api'

const ErrorExample = { errors: { not_logged_in: true } }
const SuccessExample = {
  results: [
    {
      type: 'Posting',
      id: 981784209,
      created_at: '2024-12-13T05:13:39.192+07:00',
      expiration_date: '2024-12-22T21:00:00.000+07:00',
      apply_start: '2024-12-12T21:00:00.000+07:00',
      job_id: 9523078,
      job_name: 'Software Developer (New Grad, Summer 2025 Start)',
      employer_id: 54868,
      school_id: 294,
      employer_logo_url:
        'https://s3.amazonaws.com/handshake.production/app/public/assets/institutions/54868/original/hs-emp-logo-data.?1568132481',
      job: {
        type: 'Job',
        id: 9523078,
        employer_id: 54868,
        employer_name: 'Vertex, Inc',
        industry: {
          type: 'Industry',
          id: 1034,
          name: 'Internet & Software',
          created_at: '2016-03-09T11:30:45.771+07:00',
          updated_at: '2016-03-16T05:32:32.049+07:00',
          industry_category_id: 17,
          nubs_category: 'Technology/Science',
          behavior_identifier: 'Internet & Software'
        },
        title: 'Software Developer (New Grad, Summer 2025 Start)',
        work_schedule: null,
        upgraded_job: false,
        ats_integrated: false,
        ats_provider: null,
        remote: true,
        on_site: false,
        hybrid: false,
        employment_type_name: 'Full-Time',
        job_type_name: 'Job',
        work_study: false,
        locations_option: 'worldwide',
        location_cities: [],
        location_states: [],
        location_countries: [],
        location_points: [],
        location_names: [],
        duration: 'Permanent',
        start_date: null,
        end_date: null,
        created_at: '2024-12-13T05:11:33.716+07:00',
        salary_min_raw: '',
        salary_max_raw: '',
        pay_schedule: null,
        pay_schedule_id: null,
        salary_type_behavior_identifier: 'Paid',
        currency: null,
        applied: false,
        is_promoted: null,
        should_promote: false,
        curations: []
      },
      annotation: null,
      employer_curations: []
    }
  ],
  current_page: 1,
  total_pages: 2242,
  total: 56050,
  total_hits_accurate: true,
  success: true,
  filter_views: {
    filter_views: [
      {
        name: 'Employer',
        type: 'employers',
        id: 'employers',
        configuration: {
          type: 'facet',
          name: 'Employer',
          search_method: {}
        },
        tooltip_type: 'none',
        hidden: false,
        options: [
          {
            id: 125037,
            name: 'Epic Special Education Staffing',
            count: 706,
            label: 'Epic Special Education Staffing',
            data: 706
          },
          {
            id: 19979,
            name: 'D.R. Horton, Inc.',
            count: 387,
            label: 'D.R. Horton, Inc.',
            data: 387
          },
          {
            id: 538470,
            name: 'Alliance Animal Health',
            count: 310,
            label: 'Alliance Animal Health',
            data: 310
          },
          {
            id: 48226,
            name: 'Fairfax County VA Public Schools',
            count: 250,
            label: 'Fairfax County VA Public Schools',
            data: 250
          }
        ],
        placeholder: null
      },
      {
        name: 'Label',
        type: 'added_institution_labels',
        id: 'added_institution_labels',
        configuration: {
          type: 'facet',
          name: 'Label',
          search_method: {}
        },
        tooltip_type: 'none',
        hidden: false,
        options: [],
        placeholder: null
      },
      {
        name: 'Employer Industry',
        type: 'job.industries',
        id: 'job.industries',
        configuration: {
          type: 'facet',
          name: 'Employer Industry',
          search_method: {}
        },
        tooltip_type: 'none',
        hidden: false,
        options: [
          {
            id: 1023,
            name: 'Healthcare',
            count: 8103,
            label: 'Healthcare',
            data: 8103
          },
          {
            id: 1040,
            name: 'K-12 Education',
            count: 4413,
            label: 'K-12 Education',
            data: 4413
          },
          {
            id: 1032,
            name: 'Non-Profit - Other',
            count: 3933,
            label: 'Non-Profit - Other',
            data: 3933
          },
          {
            id: 1046,
            name: 'Government - Local, State & Federal',
            count: 3523,
            label: 'Government - Local, State & Federal',
            data: 3523
          }
        ],
        placeholder: null
      },
      {
        name: 'Job Role',
        type: 'job.job_role_groups',
        id: 'job.job_role_groups',
        configuration: {
          type: 'facet',
          name: 'Job Role',
          search_method: {}
        },
        tooltip_type: 'none',
        hidden: false,
        options: [
          {
            id: 452,
            name: 'Office and Administrative Support Workers',
            count: 2929,
            label: 'Office and Administrative Support Workers',
            data: 2929
          },
          {
            id: 373,
            name: 'Accountants and Auditors',
            count: 2117,
            label: 'Accountants and Auditors',
            data: 2117
          },
          {
            id: 81,
            name: 'Civil Engineers',
            count: 2043,
            label: 'Civil Engineers',
            data: 2043
          },
          {
            id: 89,
            name: 'Mechanical Engineers',
            count: 1810,
            label: 'Mechanical Engineers',
            data: 1810
          }
        ],
        placeholder: null
      },
      {
        name: 'Employer Groups',
        type: 'employer_groups',
        id: 'employer_groups',
        configuration: {
          type: 'facet',
          name: 'Employer Groups',
          search_method: {}
        },
        tooltip_type: 'none',
        hidden: false,
        options: [
          {
            id: 1,
            name: 'CEO Action for Diversity & Inclusion',
            count: 5119,
            label: 'CEO Action for Diversity & Inclusion',
            data: 5119
          }
        ],
        placeholder: null
      },
      {
        name: 'Majors',
        type: 'majors',
        id: 'majors',
        configuration: {
          type: 'facet',
          name: 'Majors',
          search_method: {}
        },
        tooltip_type: 'none',
        hidden: false,
        options: [],
        placeholder: null
      },
      {
        name: 'Job Type',
        type: 'job.job_types',
        id: 'job.job_types',
        configuration: {
          type: 'facet',
          name: 'Job Type',
          search_method: {}
        },
        tooltip_type: 'none',
        hidden: false,
        options: [
          {
            id: 9,
            name: 'Job',
            count: null,
            label: 'Job',
            data: null
          },
          {
            id: 3,
            name: 'Internship',
            count: null,
            label: 'Internship',
            data: null
          },
          {
            id: 6,
            name: 'On Campus Student Employment',
            count: null,
            label: 'On Campus Student Employment',
            data: null
          },
          {
            id: 4,
            name: 'Cooperative Education',
            count: null,
            label: 'Cooperative Education',
            data: null
          },
          {
            id: 5,
            name: 'Experiential Learning',
            count: null,
            label: 'Experiential Learning',
            data: null
          },
          {
            id: 10,
            name: 'Volunteer',
            count: null,
            label: 'Volunteer',
            data: null
          },
          {
            id: 7,
            name: 'Fellowship',
            count: null,
            label: 'Fellowship',
            data: null
          },
          {
            id: 8,
            name: 'Graduate School',
            count: null,
            label: 'Graduate School',
            data: null
          }
        ],
        placeholder: null
      },
      {
        name: 'Employment Type',
        type: 'employment_type_names',
        id: 'employment_type_names',
        configuration: {
          type: 'facet',
          name: 'Employment Type',
          search_method: {}
        },
        tooltip_type: 'none',
        hidden: false,
        options: [
          {
            id: 3,
            name: 'Seasonal',
            count: null,
            label: 'Seasonal',
            data: null
          },
          {
            id: 1,
            name: 'Full-Time',
            count: null,
            label: 'Full-Time',
            data: null
          },
          {
            id: 2,
            name: 'Part-Time',
            count: null,
            label: 'Part-Time',
            data: null
          }
        ],
        placeholder: null
      },
      {
        name: 'Salary Type',
        type: 'job.salary_types',
        id: 'job.salary_types',
        configuration: {
          type: 'facet',
          name: 'Salary Type',
          search_method: {}
        },
        tooltip_type: 'none',
        hidden: false,
        options: [
          {
            id: 1,
            name: 'Paid',
            count: null,
            label: 'Paid',
            data: null
          },
          {
            id: 2,
            name: 'Unpaid',
            count: null,
            label: 'Unpaid',
            data: null
          }
        ],
        placeholder: null
      },
      {
        name: 'Benefits',
        type: 'benefits',
        id: 'benefits',
        configuration: {
          type: 'facet',
          name: 'Benefits',
          search_method: {}
        },
        tooltip_type: 'none',
        hidden: false,
        options: [
          {
            id: 6,
            name: 'Medical',
            count: null,
            label: 'Medical',
            data: null
          },
          {
            id: 8,
            name: 'Dental',
            count: null,
            label: 'Dental',
            data: null
          },
          {
            id: 7,
            name: 'Vision',
            count: null,
            label: 'Vision',
            data: null
          },
          {
            id: 9,
            name: 'Paid time off',
            count: null,
            label: 'Paid time off',
            data: null
          },
          {
            id: 1,
            name: 'Signing bonus',
            count: null,
            label: 'Signing bonus',
            data: null
          },
          {
            id: 2,
            name: 'Bonus',
            count: null,
            label: 'Bonus',
            data: null
          },
          {
            id: 3,
            name: 'Commission',
            count: null,
            label: 'Commission',
            data: null
          },
          {
            id: 4,
            name: 'Tips',
            count: null,
            label: 'Tips',
            data: null
          },
          {
            id: 5,
            name: 'Equity package',
            count: null,
            label: 'Equity package',
            data: null
          },
          {
            id: 10,
            name: 'Paid sick leave',
            count: null,
            label: 'Paid sick leave',
            data: null
          },
          {
            id: 11,
            name: 'Parental leave',
            count: null,
            label: 'Parental leave',
            data: null
          },
          {
            id: 12,
            name: '401(k) match',
            count: null,
            label: '401(k) match',
            data: null
          },
          {
            id: 13,
            name: 'FSA or HSA plans',
            count: null,
            label: 'FSA or HSA plans',
            data: null
          },
          {
            id: 14,
            name: 'Life insurance',
            count: null,
            label: 'Life insurance',
            data: null
          },
          {
            id: 15,
            name: 'Disability insurance',
            count: null,
            label: 'Disability insurance',
            data: null
          },
          {
            id: 16,
            name: 'Student loan repayment',
            count: null,
            label: 'Student loan repayment',
            data: null
          },
          {
            id: 17,
            name: 'Tuition reimbursement',
            count: null,
            label: 'Tuition reimbursement',
            data: null
          },
          {
            id: 18,
            name: 'Relocation assistance',
            count: null,
            label: 'Relocation assistance',
            data: null
          },
          {
            id: 19,
            name: 'Commuter assistance',
            count: null,
            label: 'Commuter assistance',
            data: null
          },
          {
            id: 20,
            name: 'Pet insurance',
            count: null,
            label: 'Pet insurance',
            data: null
          },
          {
            id: 21,
            name: 'Learning stipend',
            count: null,
            label: 'Learning stipend',
            data: null
          },
          {
            id: 22,
            name: 'Home office stipend',
            count: null,
            label: 'Home office stipend',
            data: null
          },
          {
            id: 23,
            name: 'Career development',
            count: null,
            label: 'Career development',
            data: null
          },
          {
            id: 24,
            name: 'Gym membership',
            count: null,
            label: 'Gym membership',
            data: null
          }
        ],
        placeholder: null
      }
    ],
    booleans: [
      {
        name: 'Accepts OPT/CPT',
        type: 'job.job_applicant_preference.accepts_opt_cpt_candidates',
        id: 'job.job_applicant_preference.accepts_opt_cpt_candidates',
        configuration: {
          type: 'boolean',
          name: 'Accepts OPT/CPT'
        },
        tooltip_type: 'none',
        hidden: false
      },
      {
        name: 'Accepts OPT',
        type: 'job.job_applicant_preference.accepts_opt_candidates',
        id: 'job.job_applicant_preference.accepts_opt_candidates',
        configuration: {
          type: 'boolean',
          name: 'Accepts OPT'
        },
        tooltip_type: 'none',
        hidden: false
      },
      {
        name: 'Accepts CPT',
        type: 'job.job_applicant_preference.accepts_cpt_candidates',
        id: 'job.job_applicant_preference.accepts_cpt_candidates',
        configuration: {
          type: 'boolean',
          name: 'Accepts CPT'
        },
        tooltip_type: 'none',
        hidden: false
      },
      {
        name: 'Employer is Messageable',
        type: 'job.messageable_job_user_profile',
        id: 'job.messageable_job_user_profile',
        configuration: {
          type: 'boolean',
          name: 'Employer is Messageable'
        },
        tooltip_type: 'none',
        hidden: false
      },
      {
        name: 'Hybrid',
        type: 'job.hybrid',
        id: 'job.hybrid',
        configuration: {
          type: 'boolean',
          name: 'Hybrid'
        },
        tooltip_type: 'none',
        hidden: false
      },
      {
        name: 'Interviewing on Campus',
        type: 'interviewing_on_campus',
        id: 'interviewing_on_campus',
        configuration: {
          type: 'boolean',
          name: 'Interviewing on Campus'
        },
        tooltip_type: 'none',
        hidden: false
      },
      {
        name: 'Onsite',
        type: 'job.on_site',
        id: 'job.on_site',
        configuration: {
          type: 'boolean',
          name: 'Onsite'
        },
        tooltip_type: 'none',
        hidden: false
      },
      {
        name: 'Remote Workers Allowed',
        type: 'job.remote',
        id: 'job.remote',
        configuration: {
          type: 'boolean',
          name: 'Remote Workers Allowed'
        },
        tooltip_type: 'none',
        hidden: false
      },
      {
        name: 'Salary Disclosure Opted Out',
        type: 'job.salary_disclosure_opted_out',
        id: 'job.salary_disclosure_opted_out',
        configuration: {
          type: 'boolean',
          name: 'Salary Disclosure Opted Out'
        },
        tooltip_type: 'none',
        hidden: false
      },
      {
        name: 'US Authorization Optional',
        type: 'job.job_applicant_preference.us_authorization_optional',
        id: 'job.job_applicant_preference.us_authorization_optional',
        configuration: {
          type: 'boolean',
          name: 'US Authorization Optional'
        },
        tooltip_type: 'none',
        hidden: false
      },
      {
        name: 'US Work Authorization Not Required',
        type: 'job.job_applicant_preference.work_auth_not_required',
        id: 'job.job_applicant_preference.work_auth_not_required',
        configuration: {
          type: 'boolean',
          name: 'US Work Authorization Not Required'
        },
        tooltip_type: 'none',
        hidden: false
      },
      {
        name: 'Unknown',
        type: 'job.job_applicant_preference.work_auth_not_disclosed',
        id: 'job.job_applicant_preference.work_auth_not_disclosed',
        configuration: {
          type: 'boolean',
          name: 'Unknown'
        },
        tooltip_type: 'none',
        hidden: false
      },
      {
        name: 'Willing to Sponsor',
        type: 'job.job_applicant_preference.willing_to_sponsor_candidate',
        id: 'job.job_applicant_preference.willing_to_sponsor_candidate',
        configuration: {
          type: 'boolean',
          name: 'Willing to Sponsor'
        },
        tooltip_type: 'none',
        hidden: false
      },
      {
        name: 'Work Study',
        type: 'job.work_study',
        id: 'job.work_study',
        configuration: {
          type: 'boolean',
          name: 'Work Study'
        },
        tooltip_type: 'none',
        hidden: false
      }
    ],
    success: true
  },
  search_id: 'c86815d9-008f-4d36-bfd5-c4bfd6a3ea3d'
}
type SuccessResponse = typeof SuccessExample
type ErrorResponse = typeof ErrorExample

export async function test(): Promise<boolean> {
  const res = await fetch(
    'https://app.joinhandshake.com/stu/postings?category=Posting&ajax=true&including_all_facets_in_searches=true&page=1&per_page=25&sort_direction=desc&sort_column=default&_=1734355282760',
    {
      credentials: 'include',
      headers: {
        Accept: 'application/json, text/javascript, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest',
        cookie: rookie
          .load(['joinhandshake.com'])
          .map(({ name, value }) => `${name}=${value}`)
          .join('; ')
      }
    }
  )
  const data = (await res.json()) as SuccessResponse | ErrorResponse
  return !('errors' in data)
}
