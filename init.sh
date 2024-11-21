#!/bin/bash
sudo apt update && apt upgrade -y

source activate pytorch
pip install --upgrade pip setuptools wheel

# Clone ComfyUI repository
git clone https://github.com/comfyanonymous/ComfyUI.git /home/ubuntu/ComfyUI
cd /home/ubuntu/ComfyUI
pip3 install -r requirements.txt

cd /home/ubuntu/ComfyUI/custom_nodes
git clone https://github.com/ltdrdata/ComfyUI-Manager.git
git clone https://github.com/Fannovel16/comfyui_controlnet_aux/
git clone https://github.com/pythongosssss/ComfyUI-Custom-Scripts.git
git clone https://github.com/Suzie1/ComfyUI_Comfyroll_CustomNodes

cd /home/ubuntu/ComfyUI/models/checkpoints
wget --header "Cookie: __stripe_mid=74244586-15f3-41d1-818d-30f4c4fedabcdb0c52; ref_landing_page=%2Fmodels; __Host-next-auth.csrf-token=c404bf9b1397bd23ae7c2dd87acb2c59b4b762a28492724945f35e37bf418481%7C174e93a915b6c87e0f5328e22a163351caa0329c002f7850e9f4bcee2a4b702b; __Secure-next-auth.callback-url=https%3A%2F%2Fcivitai.com%2Fmodels%2F896384%3FmodelVersionId%3D1003056; __Secure-civitai-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..SadLoeK4nRtltg2Z.o978IOCbjM5IuRPfi-TkpOEF5ydk3d8mUy29GuYxq-2cDQ1g6m1kuknmaqcKqQeeRbKqYFPY078px2oT1eeZcQtAyqZQhH2WKgKut-tHWf45XDaksJdfMc4MJpIOGKv7emDWAZjjYCTxsMVWw2jn4NTBIqEhzz4vBK_EPskLinu12pQH_acYm6mhgwQIOGHeRs1uGbI-rGO8GtTRAeiwXjnG644rzxtx3ymdv6VYxSHLmVvzsDXyhJhrvrtjXB1tJnJpPLp48nUChOD2vBWKZSs1Y2cEpdqjvSvUVgm_TDRsNgo85svqFOVJtR-bQkAy9fsZ8csXMH6Hlp8dS98tj6CtkKJ4pdGuS1lsqb7EDduqzOR4Sa4ekJxi__w_L7TRklnZRPCpNV_TkjL1kj4PLb21xQPwB_kmmugs5XjqZAuyIgwBx41h4oj-QFdOW_EIf4T0AUhXTBXVlzL8ALXiU9anNC81msBVvNLY8hoCUlJ_PskU2QivvT_mQJr2OxwOcic6SSPkSp6aBKpYUyelJ8n5vOeXIIesbJmEREAcvnYOiKdHqpP_Akq2EGyzNUxx_hSVeibg0Nw1Fzw2cA29-4F-aPwjp0_kCHoskMzQbxVt20C7omyk8XtO8LnBRhzBFq7CB7-vCYDXX9fD4yuIbm1Z594MVhflE_Y-UBaGNU14NjMPToLbTJAnkyx4IV-oNRtldfAyA_wYeuv1epCQka31z1sfK1E04c-B9STS4LYGrOraPbQ-x5JqNGyRq9SZYSDLPDwfQB7uxjOM69px6vXyviKkLqDVoRS0OypRiHHvXzsKzZnEEJpXTaZyG_Lj6Tbr0FuwnG3oYGb8M5iZ6dw1NLoZhmbonpEBAyNX_4HjWTqRO2C9R7DUxEMZnhqR-NH9EwDPSSKNNqDxZQqADTpKzHVfWR3B2yQrLZweQ0lJ1qrlBmWFxW7a_Lcu5gGVERI5FzzS2mSUP0AR7DBsH1RlKeKIrV9SxwABozKDYVX_RoG1vBYrTi39yZi6xJyDx_08lfzdWLCpfxgtcg2dbWrPc9vm8EMO0G5BxqlvcxsyvkUVgL5UTd8xDtfLUjgqOnYEoRxAbv32hB8kWAW31N-LnTrjzSJbX3gWrFsS3GAEBQXO8AklKPqSMvivxz6KjzJh6-SZu4QrFRwdBwh_DHq6nNLrrE_JYLgm0YSG5qu6-DSpFYcq-8KdwW_Tghsh2A.T-QWmYmjNF_7s_1uOH09pg" "https://civitai.com/api/download/models/128713?type=Model&format=SafeTensor&size=pruned&fp=fp16" -O dreamshaper_8.safetensors
wget --header "Cookie: __stripe_mid=74244586-15f3-41d1-818d-30f4c4fedabcdb0c52; ref_landing_page=%2Fmodels; __Host-next-auth.csrf-token=c404bf9b1397bd23ae7c2dd87acb2c59b4b762a28492724945f35e37bf418481%7C174e93a915b6c87e0f5328e22a163351caa0329c002f7850e9f4bcee2a4b702b; __Secure-next-auth.callback-url=https%3A%2F%2Fcivitai.com%2Fmodels%2F896384%3FmodelVersionId%3D1003056; __Secure-civitai-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..SadLoeK4nRtltg2Z.o978IOCbjM5IuRPfi-TkpOEF5ydk3d8mUy29GuYxq-2cDQ1g6m1kuknmaqcKqQeeRbKqYFPY078px2oT1eeZcQtAyqZQhH2WKgKut-tHWf45XDaksJdfMc4MJpIOGKv7emDWAZjjYCTxsMVWw2jn4NTBIqEhzz4vBK_EPskLinu12pQH_acYm6mhgwQIOGHeRs1uGbI-rGO8GtTRAeiwXjnG644rzxtx3ymdv6VYxSHLmVvzsDXyhJhrvrtjXB1tJnJpPLp48nUChOD2vBWKZSs1Y2cEpdqjvSvUVgm_TDRsNgo85svqFOVJtR-bQkAy9fsZ8csXMH6Hlp8dS98tj6CtkKJ4pdGuS1lsqb7EDduqzOR4Sa4ekJxi__w_L7TRklnZRPCpNV_TkjL1kj4PLb21xQPwB_kmmugs5XjqZAuyIgwBx41h4oj-QFdOW_EIf4T0AUhXTBXVlzL8ALXiU9anNC81msBVvNLY8hoCUlJ_PskU2QivvT_mQJr2OxwOcic6SSPkSp6aBKpYUyelJ8n5vOeXIIesbJmEREAcvnYOiKdHqpP_Akq2EGyzNUxx_hSVeibg0Nw1Fzw2cA29-4F-aPwjp0_kCHoskMzQbxVt20C7omyk8XtO8LnBRhzBFq7CB7-vCYDXX9fD4yuIbm1Z594MVhflE_Y-UBaGNU14NjMPToLbTJAnkyx4IV-oNRtldfAyA_wYeuv1epCQka31z1sfK1E04c-B9STS4LYGrOraPbQ-x5JqNGyRq9SZYSDLPDwfQB7uxjOM69px6vXyviKkLqDVoRS0OypRiHHvXzsKzZnEEJpXTaZyG_Lj6Tbr0FuwnG3oYGb8M5iZ6dw1NLoZhmbonpEBAyNX_4HjWTqRO2C9R7DUxEMZnhqR-NH9EwDPSSKNNqDxZQqADTpKzHVfWR3B2yQrLZweQ0lJ1qrlBmWFxW7a_Lcu5gGVERI5FzzS2mSUP0AR7DBsH1RlKeKIrV9SxwABozKDYVX_RoG1vBYrTi39yZi6xJyDx_08lfzdWLCpfxgtcg2dbWrPc9vm8EMO0G5BxqlvcxsyvkUVgL5UTd8xDtfLUjgqOnYEoRxAbv32hB8kWAW31N-LnTrjzSJbX3gWrFsS3GAEBQXO8AklKPqSMvivxz6KjzJh6-SZu4QrFRwdBwh_DHq6nNLrrE_JYLgm0YSG5qu6-DSpFYcq-8KdwW_Tghsh2A.T-QWmYmjNF_7s_1uOH09pg" https://huggingface.co/wyyadd/sd-1.5/resolve/main/v1-5-pruned-emaonly.safetensors
wget --header "Cookie: __stripe_mid=74244586-15f3-41d1-818d-30f4c4fedabcdb0c52; ref_landing_page=%2Fmodels; __Host-next-auth.csrf-token=c404bf9b1397bd23ae7c2dd87acb2c59b4b762a28492724945f35e37bf418481%7C174e93a915b6c87e0f5328e22a163351caa0329c002f7850e9f4bcee2a4b702b; __Secure-next-auth.callback-url=https%3A%2F%2Fcivitai.com%2Fmodels%2F896384%3FmodelVersionId%3D1003056; __Secure-civitai-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..SadLoeK4nRtltg2Z.o978IOCbjM5IuRPfi-TkpOEF5ydk3d8mUy29GuYxq-2cDQ1g6m1kuknmaqcKqQeeRbKqYFPY078px2oT1eeZcQtAyqZQhH2WKgKut-tHWf45XDaksJdfMc4MJpIOGKv7emDWAZjjYCTxsMVWw2jn4NTBIqEhzz4vBK_EPskLinu12pQH_acYm6mhgwQIOGHeRs1uGbI-rGO8GtTRAeiwXjnG644rzxtx3ymdv6VYxSHLmVvzsDXyhJhrvrtjXB1tJnJpPLp48nUChOD2vBWKZSs1Y2cEpdqjvSvUVgm_TDRsNgo85svqFOVJtR-bQkAy9fsZ8csXMH6Hlp8dS98tj6CtkKJ4pdGuS1lsqb7EDduqzOR4Sa4ekJxi__w_L7TRklnZRPCpNV_TkjL1kj4PLb21xQPwB_kmmugs5XjqZAuyIgwBx41h4oj-QFdOW_EIf4T0AUhXTBXVlzL8ALXiU9anNC81msBVvNLY8hoCUlJ_PskU2QivvT_mQJr2OxwOcic6SSPkSp6aBKpYUyelJ8n5vOeXIIesbJmEREAcvnYOiKdHqpP_Akq2EGyzNUxx_hSVeibg0Nw1Fzw2cA29-4F-aPwjp0_kCHoskMzQbxVt20C7omyk8XtO8LnBRhzBFq7CB7-vCYDXX9fD4yuIbm1Z594MVhflE_Y-UBaGNU14NjMPToLbTJAnkyx4IV-oNRtldfAyA_wYeuv1epCQka31z1sfK1E04c-B9STS4LYGrOraPbQ-x5JqNGyRq9SZYSDLPDwfQB7uxjOM69px6vXyviKkLqDVoRS0OypRiHHvXzsKzZnEEJpXTaZyG_Lj6Tbr0FuwnG3oYGb8M5iZ6dw1NLoZhmbonpEBAyNX_4HjWTqRO2C9R7DUxEMZnhqR-NH9EwDPSSKNNqDxZQqADTpKzHVfWR3B2yQrLZweQ0lJ1qrlBmWFxW7a_Lcu5gGVERI5FzzS2mSUP0AR7DBsH1RlKeKIrV9SxwABozKDYVX_RoG1vBYrTi39yZi6xJyDx_08lfzdWLCpfxgtcg2dbWrPc9vm8EMO0G5BxqlvcxsyvkUVgL5UTd8xDtfLUjgqOnYEoRxAbv32hB8kWAW31N-LnTrjzSJbX3gWrFsS3GAEBQXO8AklKPqSMvivxz6KjzJh6-SZu4QrFRwdBwh_DHq6nNLrrE_JYLgm0YSG5qu6-DSpFYcq-8KdwW_Tghsh2A.T-QWmYmjNF_7s_1uOH09pg" "https://civitai.com/api/download/models/93152?type=Model&format=SafeTensor&size=full&fp=fp16" -O interiordesignsuperm_v2.safetensors
wget --header "Cookie: __stripe_mid=74244586-15f3-41d1-818d-30f4c4fedabcdb0c52; ref_landing_page=%2Fmodels; __Host-next-auth.csrf-token=c404bf9b1397bd23ae7c2dd87acb2c59b4b762a28492724945f35e37bf418481%7C174e93a915b6c87e0f5328e22a163351caa0329c002f7850e9f4bcee2a4b702b; __Secure-next-auth.callback-url=https%3A%2F%2Fcivitai.com%2Fmodels%2F896384%3FmodelVersionId%3D1003056; __Secure-civitai-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..SadLoeK4nRtltg2Z.o978IOCbjM5IuRPfi-TkpOEF5ydk3d8mUy29GuYxq-2cDQ1g6m1kuknmaqcKqQeeRbKqYFPY078px2oT1eeZcQtAyqZQhH2WKgKut-tHWf45XDaksJdfMc4MJpIOGKv7emDWAZjjYCTxsMVWw2jn4NTBIqEhzz4vBK_EPskLinu12pQH_acYm6mhgwQIOGHeRs1uGbI-rGO8GtTRAeiwXjnG644rzxtx3ymdv6VYxSHLmVvzsDXyhJhrvrtjXB1tJnJpPLp48nUChOD2vBWKZSs1Y2cEpdqjvSvUVgm_TDRsNgo85svqFOVJtR-bQkAy9fsZ8csXMH6Hlp8dS98tj6CtkKJ4pdGuS1lsqb7EDduqzOR4Sa4ekJxi__w_L7TRklnZRPCpNV_TkjL1kj4PLb21xQPwB_kmmugs5XjqZAuyIgwBx41h4oj-QFdOW_EIf4T0AUhXTBXVlzL8ALXiU9anNC81msBVvNLY8hoCUlJ_PskU2QivvT_mQJr2OxwOcic6SSPkSp6aBKpYUyelJ8n5vOeXIIesbJmEREAcvnYOiKdHqpP_Akq2EGyzNUxx_hSVeibg0Nw1Fzw2cA29-4F-aPwjp0_kCHoskMzQbxVt20C7omyk8XtO8LnBRhzBFq7CB7-vCYDXX9fD4yuIbm1Z594MVhflE_Y-UBaGNU14NjMPToLbTJAnkyx4IV-oNRtldfAyA_wYeuv1epCQka31z1sfK1E04c-B9STS4LYGrOraPbQ-x5JqNGyRq9SZYSDLPDwfQB7uxjOM69px6vXyviKkLqDVoRS0OypRiHHvXzsKzZnEEJpXTaZyG_Lj6Tbr0FuwnG3oYGb8M5iZ6dw1NLoZhmbonpEBAyNX_4HjWTqRO2C9R7DUxEMZnhqR-NH9EwDPSSKNNqDxZQqADTpKzHVfWR3B2yQrLZweQ0lJ1qrlBmWFxW7a_Lcu5gGVERI5FzzS2mSUP0AR7DBsH1RlKeKIrV9SxwABozKDYVX_RoG1vBYrTi39yZi6xJyDx_08lfzdWLCpfxgtcg2dbWrPc9vm8EMO0G5BxqlvcxsyvkUVgL5UTd8xDtfLUjgqOnYEoRxAbv32hB8kWAW31N-LnTrjzSJbX3gWrFsS3GAEBQXO8AklKPqSMvivxz6KjzJh6-SZu4QrFRwdBwh_DHq6nNLrrE_JYLgm0YSG5qu6-DSpFYcq-8KdwW_Tghsh2A.T-QWmYmjNF_7s_1uOH09pg" "https://civitai.com/api/download/models/50722?type=Model&format=PickleTensor&size=full&fp=fp32" -O xsarchitectural_v11.ckpt

cd /home/ubuntu/ComfyUI/models/loras
wget --header "Cookie: __stripe_mid=74244586-15f3-41d1-818d-30f4c4fedabcdb0c52; ref_landing_page=%2Fmodels; __Host-next-auth.csrf-token=c404bf9b1397bd23ae7c2dd87acb2c59b4b762a28492724945f35e37bf418481%7C174e93a915b6c87e0f5328e22a163351caa0329c002f7850e9f4bcee2a4b702b; __Secure-next-auth.callback-url=https%3A%2F%2Fcivitai.com%2Fmodels%2F896384%3FmodelVersionId%3D1003056; __Secure-civitai-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..SadLoeK4nRtltg2Z.o978IOCbjM5IuRPfi-TkpOEF5ydk3d8mUy29GuYxq-2cDQ1g6m1kuknmaqcKqQeeRbKqYFPY078px2oT1eeZcQtAyqZQhH2WKgKut-tHWf45XDaksJdfMc4MJpIOGKv7emDWAZjjYCTxsMVWw2jn4NTBIqEhzz4vBK_EPskLinu12pQH_acYm6mhgwQIOGHeRs1uGbI-rGO8GtTRAeiwXjnG644rzxtx3ymdv6VYxSHLmVvzsDXyhJhrvrtjXB1tJnJpPLp48nUChOD2vBWKZSs1Y2cEpdqjvSvUVgm_TDRsNgo85svqFOVJtR-bQkAy9fsZ8csXMH6Hlp8dS98tj6CtkKJ4pdGuS1lsqb7EDduqzOR4Sa4ekJxi__w_L7TRklnZRPCpNV_TkjL1kj4PLb21xQPwB_kmmugs5XjqZAuyIgwBx41h4oj-QFdOW_EIf4T0AUhXTBXVlzL8ALXiU9anNC81msBVvNLY8hoCUlJ_PskU2QivvT_mQJr2OxwOcic6SSPkSp6aBKpYUyelJ8n5vOeXIIesbJmEREAcvnYOiKdHqpP_Akq2EGyzNUxx_hSVeibg0Nw1Fzw2cA29-4F-aPwjp0_kCHoskMzQbxVt20C7omyk8XtO8LnBRhzBFq7CB7-vCYDXX9fD4yuIbm1Z594MVhflE_Y-UBaGNU14NjMPToLbTJAnkyx4IV-oNRtldfAyA_wYeuv1epCQka31z1sfK1E04c-B9STS4LYGrOraPbQ-x5JqNGyRq9SZYSDLPDwfQB7uxjOM69px6vXyviKkLqDVoRS0OypRiHHvXzsKzZnEEJpXTaZyG_Lj6Tbr0FuwnG3oYGb8M5iZ6dw1NLoZhmbonpEBAyNX_4HjWTqRO2C9R7DUxEMZnhqR-NH9EwDPSSKNNqDxZQqADTpKzHVfWR3B2yQrLZweQ0lJ1qrlBmWFxW7a_Lcu5gGVERI5FzzS2mSUP0AR7DBsH1RlKeKIrV9SxwABozKDYVX_RoG1vBYrTi39yZi6xJyDx_08lfzdWLCpfxgtcg2dbWrPc9vm8EMO0G5BxqlvcxsyvkUVgL5UTd8xDtfLUjgqOnYEoRxAbv32hB8kWAW31N-LnTrjzSJbX3gWrFsS3GAEBQXO8AklKPqSMvivxz6KjzJh6-SZu4QrFRwdBwh_DHq6nNLrrE_JYLgm0YSG5qu6-DSpFYcq-8KdwW_Tghsh2A.T-QWmYmjNF_7s_1uOH09pg" "https://civitai.com/api/download/models/1003056?type=Model&format=SafeTensor&size=full&fp=fp16" -O furniture_v10.safetensors
wget --header "Cookie: __stripe_mid=74244586-15f3-41d1-818d-30f4c4fedabcdb0c52; ref_landing_page=%2Fmodels; __Host-next-auth.csrf-token=c404bf9b1397bd23ae7c2dd87acb2c59b4b762a28492724945f35e37bf418481%7C174e93a915b6c87e0f5328e22a163351caa0329c002f7850e9f4bcee2a4b702b; __Secure-next-auth.callback-url=https%3A%2F%2Fcivitai.com%2Fmodels%2F896384%3FmodelVersionId%3D1003056; __Secure-civitai-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..SadLoeK4nRtltg2Z.o978IOCbjM5IuRPfi-TkpOEF5ydk3d8mUy29GuYxq-2cDQ1g6m1kuknmaqcKqQeeRbKqYFPY078px2oT1eeZcQtAyqZQhH2WKgKut-tHWf45XDaksJdfMc4MJpIOGKv7emDWAZjjYCTxsMVWw2jn4NTBIqEhzz4vBK_EPskLinu12pQH_acYm6mhgwQIOGHeRs1uGbI-rGO8GtTRAeiwXjnG644rzxtx3ymdv6VYxSHLmVvzsDXyhJhrvrtjXB1tJnJpPLp48nUChOD2vBWKZSs1Y2cEpdqjvSvUVgm_TDRsNgo85svqFOVJtR-bQkAy9fsZ8csXMH6Hlp8dS98tj6CtkKJ4pdGuS1lsqb7EDduqzOR4Sa4ekJxi__w_L7TRklnZRPCpNV_TkjL1kj4PLb21xQPwB_kmmugs5XjqZAuyIgwBx41h4oj-QFdOW_EIf4T0AUhXTBXVlzL8ALXiU9anNC81msBVvNLY8hoCUlJ_PskU2QivvT_mQJr2OxwOcic6SSPkSp6aBKpYUyelJ8n5vOeXIIesbJmEREAcvnYOiKdHqpP_Akq2EGyzNUxx_hSVeibg0Nw1Fzw2cA29-4F-aPwjp0_kCHoskMzQbxVt20C7omyk8XtO8LnBRhzBFq7CB7-vCYDXX9fD4yuIbm1Z594MVhflE_Y-UBaGNU14NjMPToLbTJAnkyx4IV-oNRtldfAyA_wYeuv1epCQka31z1sfK1E04c-B9STS4LYGrOraPbQ-x5JqNGyRq9SZYSDLPDwfQB7uxjOM69px6vXyviKkLqDVoRS0OypRiHHvXzsKzZnEEJpXTaZyG_Lj6Tbr0FuwnG3oYGb8M5iZ6dw1NLoZhmbonpEBAyNX_4HjWTqRO2C9R7DUxEMZnhqR-NH9EwDPSSKNNqDxZQqADTpKzHVfWR3B2yQrLZweQ0lJ1qrlBmWFxW7a_Lcu5gGVERI5FzzS2mSUP0AR7DBsH1RlKeKIrV9SxwABozKDYVX_RoG1vBYrTi39yZi6xJyDx_08lfzdWLCpfxgtcg2dbWrPc9vm8EMO0G5BxqlvcxsyvkUVgL5UTd8xDtfLUjgqOnYEoRxAbv32hB8kWAW31N-LnTrjzSJbX3gWrFsS3GAEBQXO8AklKPqSMvivxz6KjzJh6-SZu4QrFRwdBwh_DHq6nNLrrE_JYLgm0YSG5qu6-DSpFYcq-8KdwW_Tghsh2A.T-QWmYmjNF_7s_1uOH09pg" "https://civitai.com/api/download/models/371394?type=Model&format=SafeTensor" -O japanese_interior_lora.safetensors
wget --header "Cookie: __stripe_mid=74244586-15f3-41d1-818d-30f4c4fedabcdb0c52; ref_landing_page=%2Fmodels; __Host-next-auth.csrf-token=c404bf9b1397bd23ae7c2dd87acb2c59b4b762a28492724945f35e37bf418481%7C174e93a915b6c87e0f5328e22a163351caa0329c002f7850e9f4bcee2a4b702b; __Secure-next-auth.callback-url=https%3A%2F%2Fcivitai.com%2Fmodels%2F896384%3FmodelVersionId%3D1003056; __Secure-civitai-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..SadLoeK4nRtltg2Z.o978IOCbjM5IuRPfi-TkpOEF5ydk3d8mUy29GuYxq-2cDQ1g6m1kuknmaqcKqQeeRbKqYFPY078px2oT1eeZcQtAyqZQhH2WKgKut-tHWf45XDaksJdfMc4MJpIOGKv7emDWAZjjYCTxsMVWw2jn4NTBIqEhzz4vBK_EPskLinu12pQH_acYm6mhgwQIOGHeRs1uGbI-rGO8GtTRAeiwXjnG644rzxtx3ymdv6VYxSHLmVvzsDXyhJhrvrtjXB1tJnJpPLp48nUChOD2vBWKZSs1Y2cEpdqjvSvUVgm_TDRsNgo85svqFOVJtR-bQkAy9fsZ8csXMH6Hlp8dS98tj6CtkKJ4pdGuS1lsqb7EDduqzOR4Sa4ekJxi__w_L7TRklnZRPCpNV_TkjL1kj4PLb21xQPwB_kmmugs5XjqZAuyIgwBx41h4oj-QFdOW_EIf4T0AUhXTBXVlzL8ALXiU9anNC81msBVvNLY8hoCUlJ_PskU2QivvT_mQJr2OxwOcic6SSPkSp6aBKpYUyelJ8n5vOeXIIesbJmEREAcvnYOiKdHqpP_Akq2EGyzNUxx_hSVeibg0Nw1Fzw2cA29-4F-aPwjp0_kCHoskMzQbxVt20C7omyk8XtO8LnBRhzBFq7CB7-vCYDXX9fD4yuIbm1Z594MVhflE_Y-UBaGNU14NjMPToLbTJAnkyx4IV-oNRtldfAyA_wYeuv1epCQka31z1sfK1E04c-B9STS4LYGrOraPbQ-x5JqNGyRq9SZYSDLPDwfQB7uxjOM69px6vXyviKkLqDVoRS0OypRiHHvXzsKzZnEEJpXTaZyG_Lj6Tbr0FuwnG3oYGb8M5iZ6dw1NLoZhmbonpEBAyNX_4HjWTqRO2C9R7DUxEMZnhqR-NH9EwDPSSKNNqDxZQqADTpKzHVfWR3B2yQrLZweQ0lJ1qrlBmWFxW7a_Lcu5gGVERI5FzzS2mSUP0AR7DBsH1RlKeKIrV9SxwABozKDYVX_RoG1vBYrTi39yZi6xJyDx_08lfzdWLCpfxgtcg2dbWrPc9vm8EMO0G5BxqlvcxsyvkUVgL5UTd8xDtfLUjgqOnYEoRxAbv32hB8kWAW31N-LnTrjzSJbX3gWrFsS3GAEBQXO8AklKPqSMvivxz6KjzJh6-SZu4QrFRwdBwh_DHq6nNLrrE_JYLgm0YSG5qu6-DSpFYcq-8KdwW_Tghsh2A.T-QWmYmjNF_7s_1uOH09pg" "https://civitai.com/api/download/models/399815?type=Model&format=SafeTensor" -O luxury_interior_lora.safetensors
wget --header "Cookie: __stripe_mid=74244586-15f3-41d1-818d-30f4c4fedabcdb0c52; ref_landing_page=%2Fmodels; __Host-next-auth.csrf-token=c404bf9b1397bd23ae7c2dd87acb2c59b4b762a28492724945f35e37bf418481%7C174e93a915b6c87e0f5328e22a163351caa0329c002f7850e9f4bcee2a4b702b; __Secure-next-auth.callback-url=https%3A%2F%2Fcivitai.com%2Fmodels%2F896384%3FmodelVersionId%3D1003056; __Secure-civitai-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..SadLoeK4nRtltg2Z.o978IOCbjM5IuRPfi-TkpOEF5ydk3d8mUy29GuYxq-2cDQ1g6m1kuknmaqcKqQeeRbKqYFPY078px2oT1eeZcQtAyqZQhH2WKgKut-tHWf45XDaksJdfMc4MJpIOGKv7emDWAZjjYCTxsMVWw2jn4NTBIqEhzz4vBK_EPskLinu12pQH_acYm6mhgwQIOGHeRs1uGbI-rGO8GtTRAeiwXjnG644rzxtx3ymdv6VYxSHLmVvzsDXyhJhrvrtjXB1tJnJpPLp48nUChOD2vBWKZSs1Y2cEpdqjvSvUVgm_TDRsNgo85svqFOVJtR-bQkAy9fsZ8csXMH6Hlp8dS98tj6CtkKJ4pdGuS1lsqb7EDduqzOR4Sa4ekJxi__w_L7TRklnZRPCpNV_TkjL1kj4PLb21xQPwB_kmmugs5XjqZAuyIgwBx41h4oj-QFdOW_EIf4T0AUhXTBXVlzL8ALXiU9anNC81msBVvNLY8hoCUlJ_PskU2QivvT_mQJr2OxwOcic6SSPkSp6aBKpYUyelJ8n5vOeXIIesbJmEREAcvnYOiKdHqpP_Akq2EGyzNUxx_hSVeibg0Nw1Fzw2cA29-4F-aPwjp0_kCHoskMzQbxVt20C7omyk8XtO8LnBRhzBFq7CB7-vCYDXX9fD4yuIbm1Z594MVhflE_Y-UBaGNU14NjMPToLbTJAnkyx4IV-oNRtldfAyA_wYeuv1epCQka31z1sfK1E04c-B9STS4LYGrOraPbQ-x5JqNGyRq9SZYSDLPDwfQB7uxjOM69px6vXyviKkLqDVoRS0OypRiHHvXzsKzZnEEJpXTaZyG_Lj6Tbr0FuwnG3oYGb8M5iZ6dw1NLoZhmbonpEBAyNX_4HjWTqRO2C9R7DUxEMZnhqR-NH9EwDPSSKNNqDxZQqADTpKzHVfWR3B2yQrLZweQ0lJ1qrlBmWFxW7a_Lcu5gGVERI5FzzS2mSUP0AR7DBsH1RlKeKIrV9SxwABozKDYVX_RoG1vBYrTi39yZi6xJyDx_08lfzdWLCpfxgtcg2dbWrPc9vm8EMO0G5BxqlvcxsyvkUVgL5UTd8xDtfLUjgqOnYEoRxAbv32hB8kWAW31N-LnTrjzSJbX3gWrFsS3GAEBQXO8AklKPqSMvivxz6KjzJh6-SZu4QrFRwdBwh_DHq6nNLrrE_JYLgm0YSG5qu6-DSpFYcq-8KdwW_Tghsh2A.T-QWmYmjNF_7s_1uOH09pg" "https://civitai.com/api/download/models/130059?type=Model&format=SafeTensor" -O minimalist_interior_lora.safetensors
wget --header "Cookie: __stripe_mid=74244586-15f3-41d1-818d-30f4c4fedabcdb0c52; ref_landing_page=%2Fmodels; __Host-next-auth.csrf-token=c404bf9b1397bd23ae7c2dd87acb2c59b4b762a28492724945f35e37bf418481%7C174e93a915b6c87e0f5328e22a163351caa0329c002f7850e9f4bcee2a4b702b; __Secure-next-auth.callback-url=https%3A%2F%2Fcivitai.com%2Fmodels%2F896384%3FmodelVersionId%3D1003056; __Secure-civitai-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..SadLoeK4nRtltg2Z.o978IOCbjM5IuRPfi-TkpOEF5ydk3d8mUy29GuYxq-2cDQ1g6m1kuknmaqcKqQeeRbKqYFPY078px2oT1eeZcQtAyqZQhH2WKgKut-tHWf45XDaksJdfMc4MJpIOGKv7emDWAZjjYCTxsMVWw2jn4NTBIqEhzz4vBK_EPskLinu12pQH_acYm6mhgwQIOGHeRs1uGbI-rGO8GtTRAeiwXjnG644rzxtx3ymdv6VYxSHLmVvzsDXyhJhrvrtjXB1tJnJpPLp48nUChOD2vBWKZSs1Y2cEpdqjvSvUVgm_TDRsNgo85svqFOVJtR-bQkAy9fsZ8csXMH6Hlp8dS98tj6CtkKJ4pdGuS1lsqb7EDduqzOR4Sa4ekJxi__w_L7TRklnZRPCpNV_TkjL1kj4PLb21xQPwB_kmmugs5XjqZAuyIgwBx41h4oj-QFdOW_EIf4T0AUhXTBXVlzL8ALXiU9anNC81msBVvNLY8hoCUlJ_PskU2QivvT_mQJr2OxwOcic6SSPkSp6aBKpYUyelJ8n5vOeXIIesbJmEREAcvnYOiKdHqpP_Akq2EGyzNUxx_hSVeibg0Nw1Fzw2cA29-4F-aPwjp0_kCHoskMzQbxVt20C7omyk8XtO8LnBRhzBFq7CB7-vCYDXX9fD4yuIbm1Z594MVhflE_Y-UBaGNU14NjMPToLbTJAnkyx4IV-oNRtldfAyA_wYeuv1epCQka31z1sfK1E04c-B9STS4LYGrOraPbQ-x5JqNGyRq9SZYSDLPDwfQB7uxjOM69px6vXyviKkLqDVoRS0OypRiHHvXzsKzZnEEJpXTaZyG_Lj6Tbr0FuwnG3oYGb8M5iZ6dw1NLoZhmbonpEBAyNX_4HjWTqRO2C9R7DUxEMZnhqR-NH9EwDPSSKNNqDxZQqADTpKzHVfWR3B2yQrLZweQ0lJ1qrlBmWFxW7a_Lcu5gGVERI5FzzS2mSUP0AR7DBsH1RlKeKIrV9SxwABozKDYVX_RoG1vBYrTi39yZi6xJyDx_08lfzdWLCpfxgtcg2dbWrPc9vm8EMO0G5BxqlvcxsyvkUVgL5UTd8xDtfLUjgqOnYEoRxAbv32hB8kWAW31N-LnTrjzSJbX3gWrFsS3GAEBQXO8AklKPqSMvivxz6KjzJh6-SZu4QrFRwdBwh_DHq6nNLrrE_JYLgm0YSG5qu6-DSpFYcq-8KdwW_Tghsh2A.T-QWmYmjNF_7s_1uOH09pg" "https://civitai.com/api/download/models/104424?type=Model&format=SafeTensor" -O neoclassic_interior_lora.safetensors
wget --header "Cookie: __stripe_mid=74244586-15f3-41d1-818d-30f4c4fedabcdb0c52; ref_landing_page=%2Fmodels; __Host-next-auth.csrf-token=c404bf9b1397bd23ae7c2dd87acb2c59b4b762a28492724945f35e37bf418481%7C174e93a915b6c87e0f5328e22a163351caa0329c002f7850e9f4bcee2a4b702b; __Secure-next-auth.callback-url=https%3A%2F%2Fcivitai.com%2Fmodels%2F896384%3FmodelVersionId%3D1003056; __Secure-civitai-token=eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..SadLoeK4nRtltg2Z.o978IOCbjM5IuRPfi-TkpOEF5ydk3d8mUy29GuYxq-2cDQ1g6m1kuknmaqcKqQeeRbKqYFPY078px2oT1eeZcQtAyqZQhH2WKgKut-tHWf45XDaksJdfMc4MJpIOGKv7emDWAZjjYCTxsMVWw2jn4NTBIqEhzz4vBK_EPskLinu12pQH_acYm6mhgwQIOGHeRs1uGbI-rGO8GtTRAeiwXjnG644rzxtx3ymdv6VYxSHLmVvzsDXyhJhrvrtjXB1tJnJpPLp48nUChOD2vBWKZSs1Y2cEpdqjvSvUVgm_TDRsNgo85svqFOVJtR-bQkAy9fsZ8csXMH6Hlp8dS98tj6CtkKJ4pdGuS1lsqb7EDduqzOR4Sa4ekJxi__w_L7TRklnZRPCpNV_TkjL1kj4PLb21xQPwB_kmmugs5XjqZAuyIgwBx41h4oj-QFdOW_EIf4T0AUhXTBXVlzL8ALXiU9anNC81msBVvNLY8hoCUlJ_PskU2QivvT_mQJr2OxwOcic6SSPkSp6aBKpYUyelJ8n5vOeXIIesbJmEREAcvnYOiKdHqpP_Akq2EGyzNUxx_hSVeibg0Nw1Fzw2cA29-4F-aPwjp0_kCHoskMzQbxVt20C7omyk8XtO8LnBRhzBFq7CB7-vCYDXX9fD4yuIbm1Z594MVhflE_Y-UBaGNU14NjMPToLbTJAnkyx4IV-oNRtldfAyA_wYeuv1epCQka31z1sfK1E04c-B9STS4LYGrOraPbQ-x5JqNGyRq9SZYSDLPDwfQB7uxjOM69px6vXyviKkLqDVoRS0OypRiHHvXzsKzZnEEJpXTaZyG_Lj6Tbr0FuwnG3oYGb8M5iZ6dw1NLoZhmbonpEBAyNX_4HjWTqRO2C9R7DUxEMZnhqR-NH9EwDPSSKNNqDxZQqADTpKzHVfWR3B2yQrLZweQ0lJ1qrlBmWFxW7a_Lcu5gGVERI5FzzS2mSUP0AR7DBsH1RlKeKIrV9SxwABozKDYVX_RoG1vBYrTi39yZi6xJyDx_08lfzdWLCpfxgtcg2dbWrPc9vm8EMO0G5BxqlvcxsyvkUVgL5UTd8xDtfLUjgqOnYEoRxAbv32hB8kWAW31N-LnTrjzSJbX3gWrFsS3GAEBQXO8AklKPqSMvivxz6KjzJh6-SZu4QrFRwdBwh_DHq6nNLrrE_JYLgm0YSG5qu6-DSpFYcq-8KdwW_Tghsh2A.T-QWmYmjNF_7s_1uOH09pg" "https://civitai.com/api/download/models/812103?type=Model&format=SafeTensor" -O indochine_interior_lora.safetensors

cd /home/ubuntu/ComfyUI/models/controlnet
wget https://huggingface.co/lllyasviel/control_v11p_sd15_lineart/resolve/main/diffusion_pytorch_model.fp16.safetensors -O control_v11p_sd15_lineart.safetensors
wget https://huggingface.co/lllyasviel/control_v11p_sd15_mlsd/resolve/main/diffusion_pytorch_model.fp16.safetensors -O control_v11p_sd15_mlsd.safetensors

cd /home/ubuntu/ComfyUI/models/vae
wget https://huggingface.co/stabilityai/sd-vae-ft-mse-original/resolve/main/vae-ft-mse-840000-ema-pruned.safetensors


# Tạo script khởi chạy ComfyUI
echo "cd /home/ubuntu/ComfyUI && source activate pytorch && python3 main.py --listen 0.0.0.0 --port 8188" > /home/ubuntu/start_comfyui.sh
chmod +x /home/ubuntu/start_comfyui.sh